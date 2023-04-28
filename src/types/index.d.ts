export type TExpense = {
    description: string;
    category: string;
    value: number;
    date: Date;
};

export type TWallet = {
    balance: number;
    income: number;
    outcome: number;
    expenses: TExpense[];
};

export type TUser = {
    name: string;
    email: string;
    password: string;
    wallet?: TWallet;
};

export type TSignIn = {
    email: string;
    password: string;
    rememberMe: boolean;
};
