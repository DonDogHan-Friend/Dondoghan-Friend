import React from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const PressableBillingList = () => {
    return (
        <Pressable>
            <View className="w-full h-14 bg-white rounded flex-row items-center justify-between">
                <View className="flex-row p-2">
                    <Text>😄</Text>
                    <Text className="ml-4">음식</Text>
                </View>
                <View className="flex-row p-2">
                    <Text className="mr-4">1,400,000</Text>
                    <Icon name="arrow-forward-ios" size={18} color="#333" />
                </View>
            </View>
        </Pressable>
    );
};

export { PressableBillingList };
