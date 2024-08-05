import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { SelectButton } from "@/components";
import { Category } from "@/pages/statistics/category/Category.tsx";
import { IncomeExpense } from "@/pages/statistics/incomeExpense/IncomeExpense.tsx";

const StatisticsPage = () => {
    const [select, setSelect] = useState<"category" | "payment">("payment");

    const onPressSelect = (value: "category" | "payment") => {
        setSelect(value);
    };

    return (
        <SafeAreaView>
            <ScrollView className="h-full w-full">
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
                {select === "category" ? <Category /> : null}
                {select === "payment" ? <IncomeExpense /> : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export { StatisticsPage };
