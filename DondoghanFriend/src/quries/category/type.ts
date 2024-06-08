export type CategoryType = "IN" | "OUT";

export type CategoryData = {
    id: number;
    emoji: string;
    name: string;
    order: number;
    type: CategoryType;
};

export type AddCategoryFormData = {
    name: string;
    type: CategoryType;
    emoji: string;
    order: number;
};
