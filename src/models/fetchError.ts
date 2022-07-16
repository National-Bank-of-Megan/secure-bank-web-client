class FetchError extends Error {
    status: number;

    constructor(status: number, msg: string) {
        super(msg);
        this.status = status;
        Object.setPrototypeOf(this, FetchError.prototype);
    }
}

export default FetchError;