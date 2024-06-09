export type CategoryType = "IN" | "OUT";

export type CategoryData = {
    id: number;
    emoji: string;
    name: string;
    order: number;
    type: CategoryType;
};

export type AddCategoryData = {
    name: string;
    type: CategoryType;
    emoji: string;
};

export type UpdateCategoryData = {
    id: number;
    name: string;
    type: CategoryType;
    emoji: string;
};
