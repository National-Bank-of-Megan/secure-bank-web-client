class TransferNotificationClass {
    title: string;
    senderFirstName: string;
    senderLastName: string;
    amount: number;
    currency: string;
    arrivalDate: Date;

    constructor(title: string, senderFirstName: string, senderLastName: string, amount: number, currency: string, arrivalDate: Date) {
        this.title = title;
        this.senderFirstName = senderFirstName;
        this.senderLastName = senderLastName;
        this.amount = amount;
        this.currency = currency;
        this.arrivalDate = arrivalDate;
    }
}

export default TransferNotificationClass;