import { AddCategoryFormData, CategoryType } from "@/quries/category/type.ts";
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
}: QueryProps<AddCategoryFormData>) => {
    await cudToDatabase({
        db,
        query: `INSERT INTO category (name, type, emoji, 'order') VALUES (?, ?, ?, ?)`,
        data,
    });
};
