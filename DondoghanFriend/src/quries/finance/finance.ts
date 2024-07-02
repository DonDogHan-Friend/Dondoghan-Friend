import { AddFinanceData, UpdateFinanceData } from "@/quries/finance/type.ts";
import { GetQueryProps, QueryProps } from "@/types/queryType.ts";
import { cudToDatabase, getToDatabase } from "@/utils/db.ts";

export const getFinance = async ({ db, setData }: GetQueryProps<any>) => {
    await getToDatabase<any>({
        db,
        query: `Select * from finance;`,
        setData,
    });
};

export const createFinance = async ({
    db,
    data,
}: QueryProps<AddFinanceData>) => {
    await cudToDatabase({
        db,
        query: `INSERT INTO finance (calendarDate, type, categoryType, detail, price, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        data: data,
    });
};

export const updateFinance = async ({
    db,
    data,
}: QueryProps<UpdateFinanceData>) => {
    await cudToDatabase({
        db,
        query: `Update finance set type = ?, categoryType = ?, detail = ?, price = ?, updatedAt = ? where id = ?`,
        data,
    });
};

export const deleteFinance = async ({ db, data }: QueryProps<any>) => {
    await cudToDatabase({
        db,
        query: `Delete from finance where id = ?`,
        data,
    });
};
