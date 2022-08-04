class JWT {
    sub: string;
    exp: number;

    constructor(sub: string, exp: number) {
        this.sub = sub;
        this.exp = exp;
    }
}

export default JWT;