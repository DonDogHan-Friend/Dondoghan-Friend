import React from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Chip } from "react-native-paper";
import { VictoryPie, VictoryTheme } from "victory-native";
import SQLite from "react-native-sqlite-storage";
import TestSQLite from "./src/TestSQLite.tsx";

function App(): React.JSX.Element {
    const [DB, setDB] = React.useState<SQLite.SQLiteDatabase | null>(null);

    const readQuery = () => {
        DB?.transaction(tx => {
            tx.executeSql(`SELECT * FROM user;`, [], (tx, results) => {
                const rows = results.rows;

                for (let i = 0; i < rows.length; i++) {
                    console.log("test: ", rows.item(i));
                }
            });
        });
    };
    const updateQuery = () => {
        DB?.transaction(tx => {
            tx.executeSql(
                'UPDATE user SET age="30" WHERE id="1"',
                [],
                (tx, results) => {
                    console.log(">>>update success : ", results.rows);
                },
            );
        });
    };

    const deleteQuery = () => {
        DB?.transaction(tx => {
            tx.executeSql(
                'DELETE FROM user WHERE age="21"',
                [],
                (tx, results) => {
                    console.log(">>>delete success : ", results.rows);
                },
            );
        });
    };

    React.useEffect(() => {
        SQLite.openDatabase(
            {
                name: "TestDB.db",
                location: "default",
                createFromLocation: "~www/TestDB.db",
            },
            DB => {
                console.log("불러오기 성공!!!!!!");
                setDB(DB);
            },
            error => {
                console.log("에러발생: ", error);
            },
        );
    }, []);

    return (
        <SafeAreaView>
            <ScrollView className="h-full w-full">
                {DB && <TestSQLite db={DB} />}
                <View className="h-12 bg-gray-500 flex justify-center">
                    <Text className="font-bold text-3xl text-white text-center">
                        TEST
                    </Text>
                </View>
                <View className="mt-4">
                    <Text className="font-bold text-lg text-black text-left p-2">
                        Line Chart
                    </Text>
                    <LineChart
                        data={{
                            labels: ["1월", "2월", "3월", "4월", "5월"],
                            datasets: [
                                {
                                    data: [100, 200, 300, 120, 150],
                                    color: (opacity = 1) =>
                                        `rgba(0, 0, 0, ${opacity})`,
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width}
                        height={200}
                        yAxisLabel="$"
                        chartConfig={{
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        bezier
                    />
                </View>
                <View className="mt-4">
                    <Text className="font-bold text-lg text-black text-left p-2">
                        Pie Chart
                    </Text>
                    <VictoryPie
                        data={[
                            { x: "Cats", y: 35 },
                            { x: "Dogs", y: 40 },
                            { x: "Birds", y: 55 },
                        ]}
                        theme={VictoryTheme.material}
                    />
                    <PieChart
                        data={[
                            {
                                name: "Seoul",
                                population: 130,
                                color: "black",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: "Beijing",
                                population: 120,
                                color: "gray",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: "New York",
                                population: 300,
                                color: "darkgray",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: "Moscow",
                                population: 120,
                                color: "lightgray",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                        ]}
                        width={Dimensions.get("window").width}
                        height={200}
                        accessor="population"
                        chartConfig={{
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        paddingLeft="15"
                        backgroundColor="transparent"
                        absolute
                    />
                </View>
                <View className="mt-4">
                    <Text className="font-bold text-lg text-black text-left p-2">
                        UI
                    </Text>
                    <View className="flex flex-row">
                        <Chip
                            mode="outlined"
                            className="w-24 mr-2 bg-white"
                            onPress={() => {
                                readQuery();
                                console.log("PRESSED");
                            }}>
                            READ
                        </Chip>
                        <Chip
                            mode="outlined"
                            className="w-24 mr-2 bg-white"
                            onPress={() => {
                                updateQuery();
                                console.log("PRESSED UPDATE BUTTON");
                            }}>
                            UPDATE
                        </Chip>
                        <Chip
                            mode="outlined"
                            className="w-24 mr-2 bg-white"
                            onPress={() => {
                                deleteQuery();
                                console.log("PRESSED DELETE BUTTON");
                            }}>
                            DELETE
                        </Chip>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default App;
