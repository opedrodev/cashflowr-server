const USER = {
    wallet: {
        balance: 1000,
        income: 0,
        outcome: 0,
        transactions: [
            {
                id: '123',
                type: 'income',
                description: 'Test Transaction',
                category: 'Test',
                value: 1000,
                date: new Date(),
            },
        ],
    },
    save: () => {},
    markModified: () => {},
};

const TRANSACTION = {
    id: '123',
    type: 'income',
    description: 'Test Transaction',
    category: 'Test',
    value: 1000,
    date: new Date().toISOString(),
};

const TRANSACTION_INCOME = {
    type: 'income',
    description: 'Salary',
    category: 'Work',
    value: 1200,
};

const TRANSACTION_OUTCOME = {
    type: 'outcome',
    description: 'Salary',
    category: 'Work',
    value: 1200,
};

const INVALID_TRANSACTION = {
    type: 'invalid',
    description: 'Salary',
    category: 'Work',
    value: 1200,
};

const TransactionMocks = {
    USER,
    TRANSACTION,
    TRANSACTION_INCOME,
    TRANSACTION_OUTCOME,
    INVALID_TRANSACTION,
};

export default TransactionMocks;
