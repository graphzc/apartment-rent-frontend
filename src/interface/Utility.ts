export default interface Utility {
    id: string;
    bookingId: string;
    billingId: string;
    plumbingUsage: number;
    plumbingCharge: number;
    electricityUsage: number;
    electricityCharge: number;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}