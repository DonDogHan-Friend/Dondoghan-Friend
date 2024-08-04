import React from "react";
import { Pressable, Text, View } from "react-native";

type SelectButtonProps = {
    items: Array<{ label: string; value: string }>;
    value: string;
    onPress(value: string): void;
};

const SelectButton = ({ items, value, onPress }: SelectButtonProps) => {
    return (
        <View className="rounded-lg flex-row items-center justify-center w-auto p-1 bg-[#C9C8C9]">
            {items.map((item) => (
                <Pressable onPress={() => onPress(item.value)}>
                    <View
                        className={`rounded-lg w-28 flex-row justify-center items-center ${value === item.value ? "bg-white" : "bg-transparent"} p-2`}>
                        <Text className="text-[13px] font-bold text-black">
                            {item.label}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </View>
    );
};

export { SelectButton };
