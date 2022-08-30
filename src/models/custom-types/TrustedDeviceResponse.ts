export type TrustedDeviceResponse = {
    id: number;
    name: string;
    ip: string;
    registrationDate: Date;
    lastLoggedInDate: Date;
    isCurrentDevice: boolean;
}