const WALLET = {
    balance: 0,
    income: 0,
    outcome: 0,
    transactions: [
        { type: 'income', value: 100 },
        { type: 'income', value: 200 },
        { type: 'outcome', value: 50 },
    ],
};

const WALLET_RESULT = {
    balance: 250,
    income: 300,
    outcome: 50,
    transactions: [
        { type: 'income', value: 100 },
        { type: 'income', value: 200 },
        { type: 'outcome', value: 50 },
    ],
};

const USER = {
    id: '123',
    wallet: WALLET,
    save: () => {},
};

const WalletMocks = {
    WALLET,
    WALLET_RESULT,
    USER,
};

export default WalletMocks;
