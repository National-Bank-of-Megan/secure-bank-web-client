class DecodedJWT {
    sub: string;
    exp: number;
    firstName: string;
    lastName: string;

    constructor(sub: string, exp: number, firstName: string, lastName: string) {
        this.sub = sub;
        this.exp = exp;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default DecodedJWT;