import React, { useState } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import CategoryItem from "./components/CategoryItem.tsx";

const Category = () => {
    const [categoryType, setCategoryType] = useState<"expend" | "income">(
        "expend",
    );

    const onPressCategoryType = (type: "expend" | "income") => {
        setCategoryType(type);
    };

    const items = ["식비", "교통비", "문화생활"];

    return (
        <View>
            <View className="flex-row justify-center items-center p-10">
                <Pressable onPress={() => onPressCategoryType("expend")}>
                    <View
                        className={`rounded-lg ${categoryType === "expend" ? "bg-red-400" : "bg-gray-300"} w-32 h-10 flex-row justify-center items-center`}>
                        <Text className="text-white font-bold">지출</Text>
                    </View>
                </Pressable>
                <Pressable
                    className="ml-4"
                    onPress={() => onPressCategoryType("income")}>
                    <View
                        className={`rounded-lg ${categoryType === "income" ? "bg-blue-400" : "bg-gray-300"} w-32 h-10 flex-row justify-center items-center`}>
                        <Text className="text-white font-bold">수입</Text>
                    </View>
                </Pressable>
            </View>
            <ScrollView>
                {items.map((item, index) => (
                    <CategoryItem key={index} item={item} />
                ))}
            </ScrollView>
        </View>
    );
};

export default Category;
