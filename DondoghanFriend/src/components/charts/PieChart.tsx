import React from "react";
import { View } from "react-native";
import Svg from "react-native-svg";
import { useFocusEffect } from "@react-navigation/native";
import { VictoryLabel, VictoryPie } from "victory-native";

export const PIE_COLORS = [
    "#496595",
    "#90a7c4",
    "#B39CC7",
    "#d3dee8",
    "#9db3b4",
    "#81BECE",
    "#dab6c2",
    "#e2664c",
    "#FECD55",
    "#d7cff8",
];

type PieChartProps = {
    data: Array<{ x: string; y: number }>;
};

const PieChart = ({ data = [] }: PieChartProps) => {
    const [endAngel, setEndAngel] = React.useState<number>(0);

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                setEndAngel(360);
            }, 100);

            return () => setEndAngel(0);
        }, []),
    );

    return (
        <View style={{ width: 400, height: 400 }}>
            <Svg viewBox="0 0 400 400">
                <VictoryPie
                    animate={{ duration: 2000, easing: "exp" }}
                    width={400}
                    height={400}
                    data={data}
                    colorScale={PIE_COLORS}
                    innerRadius={94}
                    endAngle={endAngel}
                    padAngle={2}
                    // @ts-ignore
                    labelRadius={({ innerRadius }) => (innerRadius ?? 0) + 26}
                    labelComponent={
                        <VictoryLabel
                            backgroundStyle={{
                                fill: "white",
                                opacity: 0.8,
                                borderRadius: "4px",
                            }}
                            backgroundPadding={6}
                            textAnchor="middle"
                            verticalAnchor="middle"
                        />
                    }
                    style={{
                        labels: {
                            fill: "black",
                            fontSize: 14,
                            fontWeight: "bold",
                        },
                    }}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 24 }}
                    x={205}
                    y={160}
                    text={"7월"}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 30, fontWeight: "bold" }}
                    x={205}
                    y={220}
                    text={"2,345,219"}
                />
            </Svg>
        </View>
    );
};

export { PieChart };
