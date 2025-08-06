export default interface BookingUtility {
    id: string;
    bookingId: string;
    billingId: string;
    plumbingUsage: number;
    plumbingCharge: number;
    plumbingUnitPrice?: number; // Unit price per usage for water
    electricityUsage: number;
    electricityCharge: number;
    electricityUnitPrice?: number; // Unit price per usage for electricity
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
