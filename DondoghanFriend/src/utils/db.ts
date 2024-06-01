import React from "react";
import { openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";

export const connectToDatabase = async ({
    name,
}: {
    name: string;
}): Promise<SQLiteDatabase> => {
    return openDatabase(
        {
            name: `${name}.db`,
            location: "default",
            createFromLocation: `~www/${name}.db`,
        },
        () => {},
        (error) => {
            console.error(error);
            throw Error("Could not connect to database");
        },
    );
};

export const getToDatabase = async <Data>({
    db,
    query,
    setData,
}: {
    db: SQLiteDatabase;
    query: string;
    setData: React.Dispatch<React.SetStateAction<Data[]>>;
}) => {
    try {
        await db.transaction((tx) => {
            tx.executeSql(query, [], (_, results) => {
                const rows = results.rows;
                const data: any[] = [];
                for (let index = 0; index < rows.length; index++) {
                    data.push(rows.item(index));
                }
                setData(data);
            });
        });
    } catch (error) {
        console.error(error);
        throw Error("Failed to get data");
    }
};

export const cudToDatabase = async ({
    db,
    query,
    data,
}: {
    db: SQLiteDatabase;
    query: string;
    data: any;
}) => {
    console.log("Object.values(data)", Object.values(data));
    console.log("query", query);
    try {
        await db.transaction((tx) => {
            tx.executeSql(query, Object.values(data), (_, results) => {
                console.log("resutls", results);
                if (results.rowsAffected > 0) {
                    console.log("성공하였습니다.");
                }
            });
        });
    } catch (error) {
        console.error(error);
        throw Error("Failed to add data");
    }
};
