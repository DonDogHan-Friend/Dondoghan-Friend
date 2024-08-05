import React from "react";
import { View } from "react-native";

import { PieChart, PressableBillingList } from "@/components";

const Category = () => {
    return (
        <View>
            <View className="h-auto">
                <PieChart data={data} />
            </View>
            <View className="px-4 pb-4">
                {data.map((d) => (
                    <PressableBillingList />
                ))}
            </View>
        </View>
    );
};

const data = [
    { x: "test1", y: 10 },
    { x: "test2", y: 10 },
    { x: "test3", y: 10 },
    { x: "test4", y: 10 },
    { x: "test5", y: 10 },
];

export { Category };
