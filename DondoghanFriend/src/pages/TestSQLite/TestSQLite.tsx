import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { SQLiteDatabase } from "react-native-sqlite-storage";

import {
    connectToDatabase,
    cudToDatabase,
    getToDatabase,
} from "../../utils/db.ts";

const TestSQLite = () => {
    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [users, setUsers] = useState<any[]>([]);

    console.log("users", users);

    useEffect(() => {
        loadDatabase();
    }, []);

    const loadDatabase = async () => {
        const database = await connectToDatabase({ name: "TestDB" });
        setDb(database);
    };

    const onPressRead = () => {
        console.log("조회");
        db &&
            getToDatabase({
                db,
                query: `SELECT * FROM user;`,
                setData: setUsers,
            });
    };

    const onPressCreate = () => {
        console.log("생성");
        db &&
            cudToDatabase({
                db,
                query: `INSERT INTO user (id, name, age, email) VALUES (?, ?, ?, ?)`,
                data: {
                    id: "4",
                    name: "jechoi",
                    age: 27,
                    email: "jechoi@email.com",
                },
            });
        onPressRead();
    };

    const onPressUpdate = () => {
        console.log("수정");
        db &&
            cudToDatabase({
                db,
                query: `UPDATE user set name = ? where id = ?`,
                data: {
                    name: "star",
                    id: "1",
                },
            });
        onPressRead();
    };

    const onPressDelete = () => {
        console.log("삭제");
        db &&
            cudToDatabase({
                db,
                query: `delete from user where id = ?`,
                data: { id: 3 },
            });
        onPressRead();
    };

    return (
        <View>
            <Button title={"조회"} onPress={onPressRead} />
            <Button title={"생성"} onPress={onPressCreate} />
            <Button title={"수정"} onPress={onPressUpdate} />
            <Button title={"삭제"} onPress={onPressDelete} />
        </View>
    );
};

export default TestSQLite;
