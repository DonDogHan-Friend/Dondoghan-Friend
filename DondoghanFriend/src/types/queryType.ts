import React from "react";
import { SQLiteDatabase } from "react-native-sqlite-storage";

export type GetQueryProps<Data> = {
    db: SQLiteDatabase;
    setData?: React.Dispatch<React.SetStateAction<Data[]>>;
    setCustomData?(response: Data[]): void;
};

export type QueryProps<Data> = {
    db: SQLiteDatabase;
    data: Data;
};
