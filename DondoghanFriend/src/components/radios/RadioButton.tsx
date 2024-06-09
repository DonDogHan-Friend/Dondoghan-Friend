import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type RadioButtonProps = {
    id: string;
    items: { label: string; value: string }[];
    value: string;
    color?: string;
    align?: "row" | "column";
    onChange?(id: string, value: string): void;
};

const RadioButton = ({
    id,
    items,
    value,
    color,
    align = "row",
    onChange,
}: RadioButtonProps) => {
    const [data, setData] = useState<string>(value);

    const onChangeRadio = (value: string) => {
        setData(value);
        onChange?.(id, value);
    };

    return (
        <View className={`${align === "column" ? "flex" : "flex-row"}`}>
            {items.map((item) => (
                <TouchableOpacity
                    onPress={() => onChangeRadio(item.value)}
                    activeOpacity={1}>
                    <View className="flex-row items-center justify-items-center h-7 mr-2">
                        <View
                            className={`rounded-full border w-5 h-5 mr-2 relative ${data === item.value ? "border-blue-400 border-2" : ""}`}
                        />
                        <View
                            className={
                                data === item.value
                                    ? "rounded-full w-3 h-3 bg-blue-400 absolute left-1 top-2"
                                    : ""
                            }
                            style={{ ...(color && { backgroundColor: color }) }}
                        />
                        <View className="h-5">
                            <Text className="text-black">{item.label}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export { RadioButton };
