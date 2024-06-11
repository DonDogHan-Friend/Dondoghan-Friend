import React, { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
    const isUpdate = !!route.params?.data;

    const [categorys, setCategorys] = useState<CategoryData[]>([]);
    const [categoryItems, setCategoryItems] = useState([
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
    ]);

    const [isFocus, setIsFocus] = useState(false);
    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [errors, setErrors] = useState<Array<string>>([]);

    const [form, setForm] = useState<AddFinanceData>({
        type: route.params?.data?.type ?? "OUT",
        categoryType: route.params?.data?.categoryType ?? "",
        detail: route.params?.data?.detail ?? "",
        price: route.params?.data?.price ?? 0,
        createdAt: new Date().toISOString(),
    });

    const onChangeRadio = (id: string, value: string) => {
        setForm((prev) => ({ ...prev, [id]: value }));
    };
    console.log("form>>", form);
    console.log("categoryItems>>", categoryItems);

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

    useEffect(() => {
        setCategoryItems(
            categorys.map((item: any) => ({
                label: item.name,
                value: item.name,
            })),
        );
    }, [categorys]);

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
                      data: { ...form, id: route.params?.data?.id },
                  });
            navigation.navigate("CalendarView");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>수입/지출 선택</Text>
            <View>
                <RadioButton
                    id="type"
                    items={[
                        { label: "지출", value: "OUT" },
                        { label: "수입", value: "IN" },
                    ]}
                    value={form.type ?? ""}
                    onChange={onChangeRadio}
                />
            </View>
            <Text style={styles.label}>카테고리</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                data={categoryItems}
                labelField={"label"}
                valueField={"value"}
                onChange={(item) => {
                    setForm((prev) => ({
                        ...prev,
                        ["categoryType"]: item.value,
                    }));
                    setIsFocus(false);
                }}
            />
            <Text style={styles.label}>가격</Text>
            <TextInput
                style={styles.numberInput}
                onChangeText={(text) => {
                    onChangeRadio("price", text);
                }}
                value={form.price?.toString()}
                keyboardType={"numeric"}
            />
            <Text style={styles.label}>상세내용</Text>
            <TextInput
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
            <Button title="저장" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    radioForm: {
        marginTop: 5,
    },
    numberInput: {
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 5,
        padding: 5,
    },
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
});

export { AddIncomeExpendView };
