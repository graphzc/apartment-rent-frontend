export default interface Room {
    id: string;
    apartmentId: string;
    no: string;
    description: string;
    monthlyPrice: number;
    securityDeposit: number;
    status: "AVAILABLE" | "RESERVED" | "BOOKED";
    createdAt: Date;
    updatedAt: Date;
}
