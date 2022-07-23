export type DetailedTransactionType = {
    title: string;
    date: Date;
    amount: number;
    currency: string;
    status: string;
    receiver: string;
    balanceAfterTransfer: number;
    accountCurrency: string;
};