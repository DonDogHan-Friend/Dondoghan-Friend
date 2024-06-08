import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SQLiteDatabase } from "react-native-sqlite-storage";

import { getCategory } from "@/quries/category/category.ts";
import { CategoryData, CategoryType } from "@/quries/category/type.ts";
import { getDonDogHanDBConnection } from "@/utils/connectDb.ts";

import CategoryItem from "./components/CategoryItem.tsx";

const Category = () => {
    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [categoryType, setCategoryType] = useState<CategoryType>("OUT");
    const [categorys, setCategorys] = useState<CategoryData[]>([]);

    useEffect(() => {
        getDonDogHanDBConnection().then((database) => setDb(database));
    }, []);

    useEffect(() => {
        if (db) {
            getCategory({ db, type: categoryType, setData: setCategorys });
        }
    }, [db, categoryType]);

    const onPressCategoryType = (type: CategoryType) => {
        setCategoryType(type);
    };

    return (
        <View>
            <View className="flex-row justify-center items-center p-10">
                <Pressable onPress={() => onPressCategoryType("OUT")}>
                    <View
                        className={`rounded-lg ${categoryType === "OUT" ? "bg-red-400" : "bg-gray-300"} w-32 h-10 flex-row justify-center items-center`}>
                        <Text className="text-white font-bold">지출</Text>
                    </View>
                </Pressable>
                <Pressable
                    className="ml-4"
                    onPress={() => onPressCategoryType("IN")}>
                    <View
                        className={`rounded-lg ${categoryType === "IN" ? "bg-blue-400" : "bg-gray-300"} w-32 h-10 flex-row justify-center items-center`}>
                        <Text className="text-white font-bold">수입</Text>
                    </View>
                </Pressable>
            </View>
            <ScrollView>
                {categorys.map((category, index) => (
                    <CategoryItem key={index} item={category} />
                ))}
            </ScrollView>
        </View>
    );
};

export default Category;
