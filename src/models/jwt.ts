class JWT {
    name: string;
    exp: number;

    constructor(name: string, exp: number) {
        this.name = name;
        this.exp = exp;
    }
}

export default JWT;