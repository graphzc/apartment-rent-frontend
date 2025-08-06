export default interface Billing {
    id: string;
    bookingId: string;
    billingReference: string;
    paymentHistory: any[];
    userName: string;
    no: number;
    type: string;
    amount: number;
    status: string;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
