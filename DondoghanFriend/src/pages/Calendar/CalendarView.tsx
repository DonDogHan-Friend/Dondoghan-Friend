import React, { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Button, // Dimensions 추가
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/base";

import { getFinance } from "@/quries/finance/finance.ts";
import { getDonDogHanDBConnection } from "@/utils/connectDb.ts";

const CalendarView = () => {
    const navigation = useNavigation();
    const [db, setDb] = useState<SQLiteDatabase | null>(null);

    const [selectedDate, setSelectedDate] = useState<any>("");
    const [direction, setDirection] = useState<any>(null);

    const [items, setItems] = useState<any>({
        "2024-06-08": [
            { name: "Event 1", type: "expend", price: 10000 },
            { name: "Event 2", type: "income", price: 20000 },
        ],
        "2024-06-09": [{ name: "Event 3", type: "expend", price: 20000 }],
        "2024-06-10": [
            { name: "Event 4", type: "income", price: 10000 },
            { name: "Event 5", type: "expenditure", price: 5000 },
            { name: "Event 6", type: "expenditure", price: 5000 },
        ],
    });
    const [isAddingEvent, setIsAddingEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        type: "expenditure",
        price: 0,
    });

    const renderDayComponent = ({ date, state }: any) => {
        const dayString = date.dateString;
        const events = items[dayString] || [];
        return (
            <TouchableOpacity onPress={() => onDayPress(date)}>
                <View style={styles.dayContainer}>
                    <Text
                        style={[
                            styles.dayText,
                            state === "today" && styles.todayText,
                            state === "disabled" && styles.disabledText,
                        ]}>
                        {date.day}
                    </Text>
                    {events.length > 0 &&
                        events.slice(0, 2).map((event: any, index: any) => {
                            if (event.type === "income") {
                                return (
                                    <Text
                                        key={index}
                                        style={styles.incomeText}
                                        numberOfLines={1}
                                        ellipsizeMode="tail">
                                        + {event.price}
                                    </Text>
                                );
                            } else if (event.type === "expend") {
                                return (
                                    <Text
                                        key={index}
                                        style={styles.expendText}
                                        numberOfLines={1}
                                        ellipsizeMode="tail">
                                        - {event.price}
                                    </Text>
                                );
                            }
                        })}
                </View>
            </TouchableOpacity>
        );
    };

    const renderItem = ({ item }: any) => (
        <ListItem.Swipeable
            leftWidth={0}
            rightWidth={80}
            onSwipeBegin={(direct) => setDirection(direct)}
            onSwipeEnd={() => direction === "right" && onPressDelete(() => {})}
            rightContent={(reset) => (
                <View style={{ flexDirection: "row", width: "100%" }}>
                    <TouchableOpacity
                        onPress={() => onPressDelete(reset)}
                        onBlur={() => reset()}>
                        <View
                            style={{
                                height: "100%",
                                width: 80,
                                backgroundColor: "red",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <Icon name="delete" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            )}>
            <ListItem.Content
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(
                            "AddIncomeExpend" as never,
                            {
                                data: item,
                            } as never,
                        )
                    }>
                    <Icon name="edit" size={20} />
                </TouchableOpacity>
            </ListItem.Content>
        </ListItem.Swipeable>
    );

    const onDayPress = (day: any) => {
        setSelectedDate(day.dateString);
    };

    const getMarked = () => ({
        [selectedDate]: { selected: true, selectedColor: "blue" },
    });

    const handleAddEvent = () => {
        if (newEvent.name && newEvent.price) {
            setItems((prevItems: any) => ({
                ...prevItems,
                [selectedDate]: [...(prevItems[selectedDate] || []), newEvent],
            }));
            setNewEvent({ name: "", type: "expenditure", price: 0 });
            setIsAddingEvent(false);
        }
    };

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

    useEffect(() => {
        getDonDogHanDBConnection().then((database) => setDb(database));
    }, []);

    useFocusEffect(
        useCallback(() => {
            db &&
                getFinance({
                    db,
                    setData: setItems,
                });
        }, [db]),
    );

    console.log(">>>", items);

    return (
        <View style={{ flex: 1 }}>
            <Calendar
                onDayPress={onDayPress}
                markingType={"custom"}
                markedDates={getMarked()}
                dayComponent={renderDayComponent}
                calendarWidth={Dimensions.get("window").width} // 화면의 가로 길이를 캘린더 너비로 설정
                calendarHeight={Dimensions.get("window").height / 2} // 화면의 세로 길이의 절반을 캘린더 높이로 설정
            />

            <View style={styles.listContainer}>
                <View style={styles.header}>
                    <Text style={styles.selectedDateText}>{selectedDate}</Text>
                    <Button
                        title={"추가"}
                        onPress={() =>
                            navigation.navigate(
                                "AddIncomeExpend" as never,
                                {
                                    selectedDate,
                                } as never,
                            )
                        }
                    />
                </View>
                <FlatList
                    data={items[selectedDate] || []}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            {isAddingEvent && (
                <View style={styles.addEventContainer}>
                    <Text style={styles.addEventTitle}>새 이벤트 추가</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="이벤트 이름"
                        value={newEvent.name}
                        onChangeText={(text) =>
                            setNewEvent({ ...newEvent, name: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="가격"
                        keyboardType="numeric"
                        value={newEvent.price.toString()}
                        onChangeText={(text) =>
                            setNewEvent({ ...newEvent, price: parseInt(text) })
                        }
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="취소"
                            onPress={() => setIsAddingEvent(false)}
                        />
                        <Button title="추가" onPress={handleAddEvent} />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dayContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width / 7, // 화면의 가로 길이를 7등분하여 일주일의 날짜 간격을 계산
        // height: 32, // 화면의 세로 길이를 14등분하여 날짜 간격을 계산
    },
    dayText: {
        fontSize: 14,
    },
    todayText: {
        color: "red",
    },
    disabledText: {
        color: "gray",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    incomeText: {
        fontSize: 10,
        margin: 2,
        color: "black",
        backgroundColor: "blue",
        width: "100%",
    },
    expendText: {
        fontSize: 10,
        margin: 2,
        color: "black",
        backgroundColor: "red",
        width: "100%",
    },
    item: {
        backgroundColor: "white",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    listContainer: {
        flex: 1,
        marginTop: 10,
    },
    selectedDateText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    addEventContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    addEventTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default CalendarView;
