export type DetailedTransactionType = {
    date: Date;
    title :string;
    amount: number;
    currency: string;
    status: string;
    receiver: string;
    balanceAfterTransfer: number;

};