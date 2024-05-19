import React from "react";
import { Pressable, Text, View } from "react-native";
import { ListItem } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialIcons";

type CategoryItemProps = {
    item: string;
};

const CategoryItem = ({ item }: CategoryItemProps) => {
    const onPressDelete = () => {
        console.log("delete");
    };

    return (
        <ListItem.Swipeable
            rightContent={reset => (
                <View className="flex-row w-full">
                    <Pressable onPress={() => reset()}>
                        <View className="h-full w-10 bg-gray-300 flex-row justify-center items-center">
                            <Icon name="close" size={20} color="white" />
                        </View>
                    </Pressable>
                    <Pressable onPress={onPressDelete}>
                        <View className="h-full w-20 bg-red-500 flex-row justify-center items-center">
                            <Icon name="delete" size={20} color="white" />
                            <Text className="text-white text-lg ml-2">
                                삭제
                            </Text>
                        </View>
                    </Pressable>
                </View>
            )}>
            <ListItem.Content className="flex-row items-center justify-start">
                <View className="rounded-full bg-red-300 p-2">
                    <Icon name="restaurant" size={15} color={"white"} />
                </View>
                <Text className="ml-4 text-lg font-bold">{item}</Text>
            </ListItem.Content>
        </ListItem.Swipeable>
    );
};

export default CategoryItem;
