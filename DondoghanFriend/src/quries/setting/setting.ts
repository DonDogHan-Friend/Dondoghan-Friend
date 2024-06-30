import { isEmpty } from "lodash";

import { CreateSettingData, GetSetting } from "@/quries/setting/type.ts";
import { GetQueryProps, QueryProps } from "@/types/queryType.ts";
import { cudToDatabase, getToDatabase } from "@/utils/db.ts";

export const getThresholdSetting = async ({
    db,
    setCustomData,
    key,
}: GetQueryProps<GetSetting> & { key?: string }) => {
    const where = isEmpty(key) ? "" : `where key like "${key}%"`;
    await getToDatabase({
        db,
        query: `Select * from setting ${where}`,
        setCustomData,
    });
};

export const createSetting = async ({
    db,
    data,
}: QueryProps<CreateSettingData[]>) => {
    for (let i = 0; i < data.length; i++) {
        await cudToDatabase({
            db,
            query: "Insert into setting (key, value) values (?,?)",
            data: data[i],
        });
    }
};
