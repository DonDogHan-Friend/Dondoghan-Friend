import {
    AddCategoryData,
    CategoryType,
    UpdateCategoryData,
} from "@/quries/category/type.ts";
import { GetQueryProps, QueryProps } from "@/types/queryType.ts";
import { cudToDatabase, getToDatabase } from "@/utils/db.ts";

export const getCategory = async ({
    db,
    setData,
    type,
}: GetQueryProps<any> & { type: CategoryType }) => {
    await getToDatabase<any>({
        db,
        query: `Select * from category where type = '${type}';`,
        setData,
    });
};

export const createCategory = async ({
    db,
    data,
}: QueryProps<AddCategoryData>) => {
    await cudToDatabase({
        db,
        query: `INSERT INTO category (name, type, emoji, 'order') VALUES (?, ?, ?, 0)`,
        data,
    });
};

export const updateCategory = async ({
    db,
    data,
}: QueryProps<UpdateCategoryData>) => {
    await cudToDatabase({
        db,
        query: `Update category set name = ?, type = ?, emoji = ? where id = ?`,
        data,
    });
};

export const deleteCategory = async ({ db, data }: QueryProps<any>) => {
    await cudToDatabase({
        db,
        query: `Delete from category where id = ?`,
        data,
    });
};
