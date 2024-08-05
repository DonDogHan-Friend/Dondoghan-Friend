import React from "react";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
} from "victory-native";

type BarChartProps = {
    data: Array<Array<{ x: string; y: number }>>;
    colors?: Array<string>;
};

const BAR_COLORS = ["brown", "tomato"];

const BarChart = ({ data = [], colors = BAR_COLORS }: BarChartProps) => {
    const barWidth = 20;
    const [duration, setDuration] = React.useState<number>(0);

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                setDuration(1000);

                return () => setDuration(0);
            }, 100);
        }, []),
    );

    return (
        <View style={{ height: "auto" }}>
            <ScrollView horizontal>
                <VictoryChart
                    animate={{
                        duration: 2000,
                        onLoad: { duration },
                    }}
                    domainPadding={{ x: 0 }}
                    width={data[0].length * (barWidth + 40)}>
                    <VictoryAxis />
                    <VictoryGroup
                        offset={barWidth + 4}
                        style={{ data: { width: barWidth } }}
                        colorScale={colors}>
                        {data?.map((d, index) => (
                            <VictoryBar
                                key={index}
                                data={d}
                                alignment="middle"
                                cornerRadius={{ top: 4 }}
                                labels={({ datum }) => `${datum.y} 원`}
                                style={{
                                    labels: {
                                        fill: "black",
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                    },
                                }}
                            />
                        ))}
                    </VictoryGroup>
                </VictoryChart>
            </ScrollView>
        </View>
    );
};

export { BarChart };
