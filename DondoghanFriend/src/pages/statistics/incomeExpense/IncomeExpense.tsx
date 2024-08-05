import React from "react";
import { View } from "react-native";

import { BarChart } from "@/components";

const IncomeExpense = () => {
    return (
        <View className="flex-row justify-center">
            <View className="h-auto w-[90%] overflow-y-auto">
                <BarChart data={data} colors={["#ff6772", "#00a4f5"]} />
            </View>
        </View>
    );
};

const data = [
    [
        { x: "1월", y: 10 },
        { x: "2월", y: 10 },
        { x: "3월", y: 10 },
        { x: "4월", y: 10 },
        { x: "5월", y: 10 },
        { x: "6월", y: 10 },
        { x: "7월", y: 10 },
        { x: "8월", y: 10 },
        { x: "9월", y: 10 },
    ],
    [
        { x: "1월", y: 20 },
        { x: "2월", y: 20 },
        { x: "3월", y: 5 },
        { x: "4월", y: 20 },
        { x: "5월", y: 20 },
        { x: "6월", y: 20 },
        { x: "7월", y: 20 },
        { x: "8월", y: 20 },
        { x: "9월", y: 20 },
    ],
];

export { IncomeExpense };
