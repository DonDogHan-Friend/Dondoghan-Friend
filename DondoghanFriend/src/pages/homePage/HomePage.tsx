import React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import dayjs from "dayjs";
import { last } from "lodash";

import { insertComma } from "@/utils/commonUtil";

import "dayjs/locale/ko";
dayjs.locale("ko");

const pig = require("@/assets/gif/pig.gif");
const diet_pig = require("@/assets/gif/diet_pig.gif");
const angry_pig = require("@/assets/gif/angry_pig.gif");

const HomePage = () => {
    const unit = "원";
    const now = dayjs();
    const lastMonthAmount = 800000;
    const thisMonthAmount = 500000;
    const goalAmount = 1000000;

    const amountText = (value: number, compareValue: number) => {
        const percent = (value / compareValue) * 100;
        return (
            <Text
                className={`${percent > 100 ? "text-red-500" : "text-blue-500"}`}>
                {`${insertComma(compareValue)} (${percent - 100} %)`}
            </Text>
        );
    };

    return (
        <SafeAreaView className="h-screen w-screen bg-[#A9CEC2]">
            <View className="justify-center flex-row mt-14">
                <View className="w-3/4 rounded-2xl p-4 flex justify-center items-center">
                    <View>
                        <Text className="text-lg text-black font-bold">
                            사용금액
                        </Text>
                    </View>
                    <View>
                        <Text className="text-[40px] text-white font-bold">
                            {insertComma(thisMonthAmount)} {unit}
                        </Text>
                    </View>
                </View>
            </View>
            <View className="h-80 flex-row justify-center mt-2 bg-white rounded-t-[42px]">
                <Image className="w-3/4 h-80" source={pig} />
            </View>
            <View className="h-auto flex-row justify-center p-2 bg-gray-200">
                <Text className="text-base text-[#3E4756]">
                    {now.format("YYYY-MM-DD(ddd)")}
                </Text>
            </View>
            <View className="h-full bg-white pl-2 pr-2">
                <View className="flex-row justify-between w-full h-10 p-2 border-b border-gray-200">
                    <Text>목표 금액</Text>
                    {amountText(thisMonthAmount, goalAmount)}
                </View>
                <View className="flex-row justify-between w-full h-10 p-2 border-b border-gray-200">
                    <Text>지난달 사용 금액</Text>
                    {amountText(thisMonthAmount, lastMonthAmount)}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomePage;
