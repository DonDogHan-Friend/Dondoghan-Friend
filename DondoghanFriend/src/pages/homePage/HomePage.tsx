import React, { useCallback, useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import {
    createSetting,
    getThresholdSetting,
} from "@/quries/setting/setting.ts";
import { GetSetting, Threshold } from "@/quries/setting/type.ts";
import { insertComma } from "@/utils/commonUtil";
import { getDonDogHanDBConnection } from "@/utils/connectDb.ts";

import "dayjs/locale/ko";
import {isEmpty} from "lodash";
dayjs.locale("ko");

const pig = require("@/assets/gif/pig.gif");
const diet_pig = require("@/assets/gif/diet_pig.gif");
const angry_pig = require("@/assets/gif/angry_pig.gif");

const threshold = {
    threshold_safety: {gif: pig, color: '#A9CEC2'},
    threshold_caution: {gif: diet_pig, color: '#F9F871'},
    threshold_warning: {gif: angry_pig, color: '#EE005F'},
}

const HomePage = () => {
    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [thresholdSettingData, setThresholdSettingData] = useState<Threshold>({});
    const [thresholdKey, setThresholdKey] = useState<keyof Threshold>('threshold_safety')

    const unit = "원";
    const now = dayjs();
    const lastMonthAmount = 800000;
    const thisMonthAmount = 500000;
    const goalAmount = 1000000;

    useEffect(() => {
        getDonDogHanDBConnection().then((database) => setDb(database));
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (!db) return;
            getThresholdSetting({
                db,
                key: "threshold",
                setCustomData: (response) =>
                    setThresholdSettingData(() => {
                        if (response.length === 0) return {};
                        const threshold: Threshold = {};
                        response.forEach(({ key, value }: GetSetting) => {
                            threshold[key as keyof Threshold] = Number(value);
                        });
                        return threshold;
                    }),
            });
        }, [db]),
    );

    useEffect(() => {
        if (isEmpty(thresholdSettingData)) return;
        const percent = thisMonthAmount / goalAmount * 100;
        const keys = Object.keys(thresholdSettingData) as Array<keyof Threshold>;;
        for (const key of keys) {
            if (percent <= (thresholdSettingData[key] || 100)) {
                setThresholdKey(key);
                break;
            }
        }
    }, [thresholdSettingData])

    // 임계치 값이 setting table에 없는 경우
    /*const onPressButton = () => {
        if (db) {
            createSetting({
                db,
                data: [
                    { key: "threshold_safety", value: "30" },
                    { key: "threshold_caution", value: "60" },
                    { key: "threshold_warning", value: "90" },
                ],
            });
        }
    };*/

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
        <SafeAreaView className={`h-screen w-screen`} style={{backgroundColor: threshold[thresholdKey].color}}>
            <View className="justify-center flex-row mt-14">
                <View className="w-3/4 rounded-2xl p-4 flex justify-center items-center">
                    <View>
                        <Text className="text-[15px] text-black font-bold">
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
                <Image className="w-3/4 h-80" source={threshold[thresholdKey].gif} />
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
                {/*<View>*/}
                {/*    <Button title={"button"} onPress={onPressButton} />*/}
                {/*</View>*/}
            </View>
        </SafeAreaView>
    );
};

export default HomePage;
