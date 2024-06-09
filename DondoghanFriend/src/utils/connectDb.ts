import { SQLiteDatabase } from "react-native-sqlite-storage";

import { connectToDatabase } from "@/utils/db.ts";

export const getDonDogHanDBConnection = async (): Promise<SQLiteDatabase> => {
    return await connectToDatabase({ name: "dondoghan" });
};
