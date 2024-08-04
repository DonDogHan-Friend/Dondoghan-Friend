import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { PieChart, PressableBillingList, SelectButton } from "@/components";

const StatisticsPage = () => {
    const [select, setSelect] = useState<string>("category");

    const onPressSelect = (value: string) => {
        setSelect(value);
    };

    return (
        <SafeAreaView>
            <ScrollView className="h-full">
                <View className="mt-4 flex-row justify-center">
                    <SelectButton
                        items={[
                            { label: "지출/수입", value: "payment" },
                            { label: "카테고리", value: "category" },
                        ]}
                        value={select}
                        onPress={onPressSelect}
                    />
                </View>
                <View className="h-auto">
                    <PieChart data={data} />
                </View>
                <View className="p-4">
                    {data.map((d) => (
                        <PressableBillingList />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const data = [
    { x: "test1", y: 10 },
    { x: "test2", y: 10 },
    { x: "test3", y: 10 },
    { x: "test4", y: 10 },
    { x: "test5", y: 10 },
];

export { StatisticsPage };
