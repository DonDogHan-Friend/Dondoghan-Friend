import { openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";

import { GetQueryProps } from "@/types/queryType.ts";

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
    setCustomData,
}: { query: string } & GetQueryProps<Data>) => {
    try {
        console.log("query", query);
        await db.transaction((tx) => {
            tx.executeSql(
                query,
                [],
                (_, results) => {
                    const rows = results.rows;
                    console.log("rows", rows);
                    const data: any[] = [];
                    for (let index = 0; index < rows.length; index++) {
                        data.push(rows.item(index));
                    }
                    setData?.(data);
                    setCustomData?.(data);
                },
                (error) => {
                    console.log("error", error);
                },
            );
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
            tx.executeSql(
                query,
                Object.values(data),
                (_, results) => {
                    console.log("results", results);
                    if (results.rowsAffected > 0) {
                        console.log("성공하였습니다.");
                    }
                },
                (error) => {
                    console.log("error", error);
                },
            );
        });
    } catch (error) {
        console.error(error);
        throw Error("Failed to add data");
    }
};
