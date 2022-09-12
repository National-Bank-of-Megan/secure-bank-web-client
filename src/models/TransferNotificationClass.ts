class TransferNotificationClass {
    title: string;
    senderFirstname: string;
    senderLastname: string;
    amount: number;
    currency: string;
    arrivalDate: Date ;

    constructor(title: string, senderFirstname: string, senderLastname: string, amount: number, currency: string, arrivalDate :Date) {
        this.title = title;
        this.senderFirstname = senderFirstname;
        this.senderLastname = senderLastname;
        this.amount = amount;
        this.currency = currency;
        this.arrivalDate = arrivalDate;
    }
}

export default TransferNotificationClass;