import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AddIncomeExpendView } from "@/pages/Calendar/AddIncomeExpendView.tsx";
import { AddCategory } from "@/pages/myPage";
import Category from "@/pages/myPage/category/Category.tsx";

import Main from "./src/pages/Home/Main.tsx";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={"Main"}
                    component={Main}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={"Category"}
                    component={Category}
                    options={({ navigation }) => ({
                        title: "카테고리 설정",
                        headerStyle: { backgroundColor: "#F2F2F2" },
                        headerRight: () => (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("CreateCategory")
                                }>
                                <Icon name="add" size={30} color={"black"} />
                            </Pressable>
                        ),
                    })}
                />
                <Stack.Screen
                    name={"CreateCategory"}
                    component={AddCategory}
                    options={({ navigation }) => ({
                        title: "카테고리 추가",
                        headerBackVisible: false,
                        headerTitleAlign: "center",
                        headerLeft: (props) => (
                            <TouchableOpacity
                                {...props}
                                onPress={() => navigation.navigate("Category")}>
                                <Icon name="close" size={30} color={"black"} />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name={"UpdateCategory"}
                    component={AddCategory}
                    options={({ navigation }) => ({
                        title: "카테고리 수정",
                        headerBackVisible: false,
                        headerTitleAlign: "center",
                        headerLeft: (props) => (
                            <TouchableOpacity
                                {...props}
                                onPress={() => navigation.navigate("Category")}>
                                <Icon name="close" size={30} color={"black"} />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name={"AddIncomeExpend"}
                    component={AddIncomeExpendView}
                    options={({ navigation }) => ({
                        title: "내역 추가",
                        headerBackVisible: false,
                        headerTitleAlign: "center",
                        headerLeft: (props) => (
                            <TouchableOpacity
                                {...props}
                                onPress={() => navigation.goBack()}>
                                <Icon name="close" size={30} color={"black"} />
                            </TouchableOpacity>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
