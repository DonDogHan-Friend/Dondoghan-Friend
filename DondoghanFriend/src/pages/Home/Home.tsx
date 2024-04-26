import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Home = ({ navigation }: NativeStackScreenProps<any>) => {
    return (
        <View>
            <Text>This is Home</Text>

            <Button
                title={"Chart 이동"}
                onPress={() => navigation.navigate("Chart")}
            />
            <Button
                title={"SQLite 이동"}
                onPress={() => navigation.navigate("SQLite")}
            />
        </View>
    );
};

export default Home;
