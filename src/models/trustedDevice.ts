class TrustedDevice {
    id: number;
    name: string;
    ip: string;
    registrationDate: Date;
    lastLoggedInDate: Date;
    isCurrentDevice: boolean;

    constructor(id: number, name: string, ip: string, registrationDate: Date, lastLoggedInDate: Date, isCurrentDevice: boolean) {
        this.id = id;
        this.name = name;
        this.ip = ip;
        this.registrationDate = registrationDate;
        this.lastLoggedInDate = lastLoggedInDate;
        this.isCurrentDevice = isCurrentDevice;
    }
}

export default TrustedDevice;