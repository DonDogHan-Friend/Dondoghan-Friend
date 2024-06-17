export type FinanceType = "IN" | "OUT";

export type financeData = {
    id?: number;
    type?: FinanceType;
    categoryType?: string;
    price?: number;
    detail?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type AddFinanceData = {
    calendarDate?: string;
    type?: FinanceType;
    categoryType?: string;
    price?: number;
    detail?: string;
    createdAt?: string;
};

export type UpdateFinanceData = {
    id?: number;
    type?: FinanceType;
    categoryType?: string;
    price?: number;
    detail?: string;
    updatedAt?: string;
};
