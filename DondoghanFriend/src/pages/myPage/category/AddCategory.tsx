import React, { useEffect, useState } from "react";
import {
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import _ from "lodash";

import { RadioButton } from "@/components";
import { createCategory, updateCategory } from "@/quries/category/category.ts";
import { AddCategoryData } from "@/quries/category/type";
import { getDonDogHanDBConnection } from "@/utils/connectDb.ts";

const AddCategory = ({ navigation, route }: NativeStackScreenProps<any>) => {
    const isUpdate = !!route.params?.data;
    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [form, setForm] = useState<AddCategoryData>({
        name: route.params?.data?.name ?? "",
        type: route.params?.data?.type ?? "OUT",
        emoji: route.params?.data?.emoji ?? "",
    });
    const [errors, setErrors] = useState<Array<string>>([]);
    const [isShowEmojiSelector, setIsShowEmojiSelect] =
        useState<boolean>(false);

    useEffect(() => {
        getDonDogHanDBConnection().then((database) => setDb(database));
    }, []);

    const onChangeText = (id: string, value: string) => {
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const onChangeRadio = (id: string, value: string) => {
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const onSelectEmoji = (emoji: string) => {
        setForm((prev) => ({ ...prev, emoji }));
    };

    const onPressSave = () => {
        const tempErrors: Array<string> = [];
        if (_.isEmpty(form.name)) tempErrors.push("name");
        if (_.isEmpty(form.emoji)) tempErrors.push("emoji");

        if (tempErrors.length > 0) return setErrors(tempErrors);
        setErrors([]);

        if (db) {
            !isUpdate
                ? createCategory({ db, data: form })
                : updateCategory({
                      db,
                      data: { ...form, id: route.params?.data?.id },
                  });
            navigation.navigate("Category");
        }
    };

    return (
        <View className="p-3 bg-white h-full">
            <View className="mt-4">
                <View className="flex-row mb-3">
                    <Text className="text-md text-gray-800">유형</Text>
                    <Text className="text-red-500 ml-1">*</Text>
                </View>
                <RadioButton
                    id="type"
                    items={[
                        { label: "지출", value: "OUT" },
                        { label: "수입", value: "IN" },
                    ]}
                    value={form.type}
                    onChange={onChangeRadio}
                />
            </View>
            <View className="flex-row mb-3 mt-6">
                <Text className="text-md text-gray-800">이름</Text>
                <Text className="text-red-500 ml-1">*</Text>
                {errors.includes("name") && (
                    <Text className="text-red-500 ml-2">
                        이름을 입력해주세요.
                    </Text>
                )}
            </View>
            <TextInput
                className={`border rounded ${errors.includes("name") ? "border-red-400" : "border-gray-400"}`}
                placeholder="이름 입력"
                placeholderTextColor="darkgray"
                value={form.name}
                onChangeText={(value) => onChangeText("name", value)}
            />
            <View className="flex-row mb-3 mt-6">
                <Text className="text-md text-gray-800">아이콘</Text>
                <Text className="text-red-500 ml-1">*</Text>
                {errors.includes("emoji") && (
                    <Text className="text-red-500 ml-2">
                        아이콘을 선택해주세요.
                    </Text>
                )}
            </View>
            <Pressable
                className="h-20 w-20"
                onPress={() => setIsShowEmojiSelect((prev) => !prev)}>
                <View
                    className={`border ${errors.includes("emoji") ? "border-red-400" : "border-gray-400"}  rounded w-20 h-20 flex-row items-center justify-center mb-3`}>
                    {form?.emoji ? (
                        <Text className="text-4xl text-white">
                            {form?.emoji}
                        </Text>
                    ) : (
                        <Text className="text-4xl text-gray-400">+</Text>
                    )}
                </View>
            </Pressable>
            <View className="h-72">
                {isShowEmojiSelector && (
                    <EmojiSelector
                        category={Categories.all}
                        onEmojiSelected={onSelectEmoji}
                        showSearchBar={false}
                        showHistory={true}
                        showSectionTitles={false}
                    />
                )}
            </View>

            <TouchableOpacity
                className="mt-4 h-11 rounded flex justify-center items-center bg-blue-400"
                onPress={onPressSave}>
                <Text className="text-white text-lg font-bold">
                    {!isUpdate ? "추가" : "수정"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export { AddCategory };
