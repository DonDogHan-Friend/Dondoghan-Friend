export type GetSetting = {
    key: string;
    value: string;
};

export type Threshold = {
    threshold_safety?: number;
    threshold_caution?: number;
    threshold_warning?: number;
};

export type CreateSettingData = {
    key: string;
    value: string;
};
