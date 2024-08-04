import React from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CalendarView from "@/pages/Calendar/CalendarView.tsx";
import HomePage from "@/pages/homePage/HomePage.tsx";
import MyPage from "@/pages/myPage/MyPage";
import { StatisticsPage } from "@/pages/statistics";

const Tab = createBottomTabNavigator();

function ChartScreen() {
    return <Text>Chart</Text>;
}

function Main() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    title: "홈",
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size + 5} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarView}
                options={{
                    title: "달력",
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name="calendar-today"
                            color={color}
                            size={size + 5}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Chart"
                component={StatisticsPage}
                options={{
                    title: "통계",
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name="leaderboard"
                            color={color}
                            size={size + 5}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="MyPage"
                component={MyPage}
                options={{
                    title: "내 정보",
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" color={color} size={size + 5} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Main;
