import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ListItem } from "@rneui/base";

import { CategoryData } from "@/quries/category/type.ts";

type CategoryItemProps = {
    item: CategoryData;
};

type swipeDirection = "left" | "right" | null;

const CategoryItem = ({ item }: CategoryItemProps) => {
    const [direction, setDirection] = useState<swipeDirection>(null);

    const onPressDelete = (reset: any) => {
        Alert.alert(
            "",
            "삭제하시겠습니까?",
            [
                { text: "취소", style: "cancel", onPress: () => reset() },
                { text: "확인", onPress: () => {} },
            ],
            {
                cancelable: true,
                onDismiss: () => reset(),
            },
        );
    };

    return (
        <View className="border-b border-gray-200">
            <ListItem.Swipeable
                leftWidth={0}
                rightWidth={80}
                onSwipeBegin={(direct) => setDirection(direct)}
                onSwipeEnd={() =>
                    direction === "right" && onPressDelete(() => {})
                }
                rightContent={(reset) => (
                    <View className="flex-row w-full">
                        <Pressable
                            onPress={() => onPressDelete(reset)}
                            onBlur={() => reset()}>
                            <View className="h-full w-20 bg-red-500 flex-row justify-center items-center">
                                <Icon name="delete" size={20} color="white" />
                            </View>
                        </Pressable>
                    </View>
                )}>
                <ListItem.Content className="flex-row items-center justify-start">
                    <View className="rounded-full p-2">
                        <Text className="text-white text-lg">{item.emoji}</Text>
                    </View>
                    <Text className="ml-4 text-lg font-bold">{item.name}</Text>
                </ListItem.Content>
            </ListItem.Swipeable>
        </View>
    );
};

export default CategoryItem;
