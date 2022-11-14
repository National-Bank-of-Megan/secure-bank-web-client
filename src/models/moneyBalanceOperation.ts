class MoneyBalanceOperation {
    id: number;
    requestDate: Date;

    constructor(id: number, requestDate: Date) {
        this.id = id;
        this.requestDate = requestDate;
    }
}

export default MoneyBalanceOperation;