import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./src/pages/Home/Main.tsx";
import Category from "./src/pages/myPage/category/Category.tsx";

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
                    options={{
                        title: "카테고리 설정",
                        headerStyle: { backgroundColor: "#F2F2F2" },
                        headerBackTitle: "뒤로",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
