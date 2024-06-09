import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const MyPage = () => {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View className="h-screen w-screen">
                <View className="h-1/4 w-screen bg-gray-500 flex items-center justify-center">
                    <View className="rounded-full p-4 shadow-sm bg-gray-400 mt-5">
                        <Icon name="savings" size={70} color={"white"} />
                    </View>
                    <Text className="mt-4 text-white text-base">돈독이</Text>
                </View>
                <View>
                    <View className="flex-row items-center justify-around p-5">
                        <View className="flex items-center">
                            <Icon name="palette" size={45} />
                            <Text>테마</Text>
                        </View>
                        <View className="flex items-center">
                            <Icon name="paid" size={45} />
                            <Text>통화</Text>
                        </View>
                        <View className="flex items-center">
                            <Icon name="notifications" size={45} />
                            <Text>알림</Text>
                        </View>
                    </View>
                    <View className="h-14 bg-white p-4">
                        <Pressable
                            className="w-full flex-row items-center justify-between"
                            onPress={() =>
                                navigation.navigate("Category" as never)
                            }>
                            <Text>동물 설정</Text>
                            <Icon name="arrow-forward-ios" size={15} />
                        </Pressable>
                    </View>
                    <View className="h-14 bg-white mt-1 p-4">
                        <Pressable
                            className="w-full flex-row items-center justify-between"
                            onPress={() =>
                                navigation.navigate("Category" as never)
                            }>
                            <Text>카테고리 설정</Text>
                            <Icon name="arrow-forward-ios" size={15} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default MyPage;
