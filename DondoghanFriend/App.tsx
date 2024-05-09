import React from "react";
import { TestSQLite } from "./src/pages/TestSQLite";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestChart from "./src/pages/TestChart/TestChart.tsx";
// import Home from "./src/pages/Home/Home.tsx";
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
                <Stack.Screen name={"SQLite"} component={TestSQLite} />
                <Stack.Screen name={"Chart"} component={TestChart} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
