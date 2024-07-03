import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import _ from "lodash";

import { RadioButton } from "@/components";
import { getCategory } from "@/quries/category/category.ts";
import { CategoryData, CategoryType } from "@/quries/category/type.ts";
import { createFinance, updateFinance } from "@/quries/finance/finance.ts";
import { AddFinanceData } from "@/quries/finance/type.ts";
import { getDonDogHanDBConnection } from "@/utils/connectDb.ts";

const AddIncomeExpendView = ({
    navigation,
    route,
}: NativeStackScreenProps<any>) => {
    const refRBSheet = useRef<any>();
    console.log(">>>route", route);
    const isUpdate = route.params?.isUpdate;
    const [categorys, setCategorys] = useState<CategoryData[]>([]);

    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [errors, setErrors] = useState<Array<string>>([]);

    const [form, setForm] = useState<AddFinanceData>({
        calendarDate: route.params?.data?.calendarDate ?? "",
        type: route.params?.data?.type ?? "OUT",
        categoryType: route.params?.data?.categoryType ?? "",
        detail: route.params?.data?.detail ?? "",
        price: route.params?.data?.price ?? 0,
        createdAt: dayjs().format("YYYY-MM-DD"),
    });

    const onChangeRadio = (id: string, value: string) => {
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
        getDonDogHanDBConnection().then((database) => setDb(database));
    }, []);

    useFocusEffect(
        useCallback(() => {
            db &&
                getCategory({
                    db,
                    type: form.type as CategoryType,
                    setData: setCategorys,
                });
        }, [db, form.type]),
    );
    console.log(">>>form>>", form);

    const handleSubmit = () => {
        const tempErrors: Array<string> = [];
        if (_.isEmpty(form.type)) tempErrors.push("type");
        if (_.isEmpty(form.categoryType)) tempErrors.push("categoryType");

        if (tempErrors.length > 0) return setErrors(tempErrors);
        setErrors([]);

        if (db) {
            !isUpdate
                ? createFinance({ db, data: form })
                : updateFinance({
                      db,
                      data: {
                          type: form.type,
                          categoryType: form.categoryType,
                          detail: form.detail,
                          price: form.price,
                          updatedAt: dayjs().format("YYYY-MM-DD"),
                          id: route.params?.data?.id,
                      },
                  });
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView>
            <View className="p-3 bg-white h-full relative">
                <View className="flex-row mb-3 mt-6">
                    <Text className="text-md text-gray-800">
                        수입/지출 선택
                    </Text>
                    <Text className="text-red-500 ml-1">*</Text>
                </View>
                <RadioButton
                    id="type"
                    items={[
                        { label: "지출", value: "OUT" },
                        { label: "수입", value: "IN" },
                    ]}
                    value={form.type ?? ""}
                    onChange={onChangeRadio}
                />
                <View className="flex-row mb-3 mt-6">
                    <Text className="text-md text-gray-800">카테고리</Text>
                    <Text className="text-red-500 ml-1">*</Text>
                </View>
                <View className="flex-row mb-3 mt-6">
                    <Text className={`h-12 border-gray-400`}>
                        {form?.categoryType
                            ? form?.categoryType
                            : "선택해주세요."}
                    </Text>
                    {/*<Dropdown*/}
                    {/*    style={[styles.dropdown, isFocus && { borderColor: "blue" }]}*/}
                    {/*    data={categoryItems}*/}
                    {/*    labelField={"label"}*/}
                    {/*    valueField={"value"}*/}
                    {/*    onChange={(item) => {*/}
                    {/*        setForm((prev) => ({*/}
                    {/*            ...prev,*/}
                    {/*            ["categoryType"]: item.value,*/}
                    {/*        }));*/}
                    {/*        setIsFocus(false);*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <Pressable
                        className="w-20"
                        onPress={() => refRBSheet.current.open()}>
                        <View
                            className={`rounded-lg bg-blue-400 w-32 h-10 flex-row justify-center items-center`}>
                            <Text className="text-white font-bold">선택</Text>
                        </View>
                    </Pressable>
                </View>
                <RBSheet
                    ref={refRBSheet}
                    draggable
                    customModalProps={{
                        animationType: "slide",
                        statusBarTranslucent: true,
                    }}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        },
                        draggableIcon: {
                            width: 80,
                        },
                    }}>
                    <ScrollView style={styles.listContainer}>
                        {categorys.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.listButton}
                                onPress={() => {
                                    setForm((prev) => ({
                                        ...prev,
                                        categoryType: item.name,
                                    }));
                                    refRBSheet.current.close();
                                }}>
                                <Text style={{ fontSize: 16, flex: 1 }}>
                                    {item.emoji}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        flex: 1,
                                        color: "gray",
                                    }}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </RBSheet>
                <View className="flex-row mb-3 mt-6">
                    <Text className="text-md text-gray-800">가격</Text>
                    <Text className="text-red-500 ml-1">*</Text>
                </View>
                <TextInput
                    className={`h-12 border rounded ${errors.includes("price") ? "border-red-400" : "border-gray-400"}`}
                    onChangeText={(text) => {
                        onChangeRadio("price", text);
                    }}
                    value={form.price?.toString()}
                    keyboardType={"numeric"}
                />
                <View className="flex-row mb-3 mt-6">
                    <Text className="text-md text-gray-800">상세내용</Text>
                </View>
                <TextInput
                    className={`h-12 border rounded border-gray-400`}
                    style={styles.textInput}
                    onChangeText={(text) => {
                        setForm((prev) => ({
                            ...prev,
                            ["detail"]: text,
                        }));
                    }}
                    value={form.detail}
                    placeholder="상세내용을 입력하세요."
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <View className="absolute bottom-1 w-full flex-row justify-center p-2">
                <TouchableOpacity
                    className="h-11 w-full rounded flex justify-center items-center bg-blue-400 "
                    onPress={handleSubmit}>
                    <Text className="text-white text-lg font-bold">저장</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 5,
        padding: 5,
    },
    dropdown: {
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    listContainer: {
        flex: 1,
        padding: 25,
    },
    listButton: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
});

export { AddIncomeExpendView };
