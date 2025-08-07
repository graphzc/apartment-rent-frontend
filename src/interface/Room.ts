export default interface Room {
    id: string;
    apartmentId: string;
    no: string;
    description: string;
    monthlyPrice: number;
    securityDeposit: number;
    address: string;
    status: "AVAILABLE" | "RESERVED" | "BOOKED";
    createdAt: Date;
    updatedAt: Date;
}
