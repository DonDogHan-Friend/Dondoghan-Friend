import React from "react";
import SQLite from "react-native-sqlite-storage";
import { View } from "react-native";

const TestSQLite = ({ db }: { db: SQLite.SQLiteDatabase }) => {
    db.transaction(tx => {
        tx.executeSql(`SELECT * FROM user;`, [], (tx, results) => {
            const rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
                console.log("test: ", rows.item(i));
            }
        });
    });

    return <View />;
};

export default TestSQLite;
