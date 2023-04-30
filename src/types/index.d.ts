export type TTransactionType = 'income' | 'outcome';

export type TTransaction = {
    id?: string,
    type: TTransactionType;
    description: string;
    category: string;
    value: number;
    date: Date;
};

export type TWallet = {
    balance: number;
    income: number;
    outcome: number;
    transactions: TTransaction[];
};

export type TUser = {
    name: string;
    email: string;
    password: string;
    wallet: TWallet;
};

export type TSignIn = {
    email: string;
    password: string;
    rememberMe: boolean;
};
