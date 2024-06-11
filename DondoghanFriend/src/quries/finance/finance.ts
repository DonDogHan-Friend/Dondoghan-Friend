import { GetQueryProps, QueryProps } from "@/types/queryType.ts";
import { cudToDatabase, getToDatabase } from "@/utils/db.ts";
import { AddFinanceData, UpdateFinanceData } from "@/quries/finance/type.ts";

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
        query: `INSERT INTO finance (type, categoryType, price, detail, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
        data,
    });
};

export const updateFinance = async ({
    db,
    data,
}: QueryProps<UpdateFinanceData>) => {
    await cudToDatabase({
        db,
        query: `Update finance set type = ?, categoryType = ?, price = ?, detail = ?, createdAt = ?, updatedAt = ? where id = ?`,
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
