export interface PaymentHistoryV2 {
    id: string;
    slipImage: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface BillingV2 {
    id: string;
    bookingId: string;
    billingReference: string;
    paymentHistory: PaymentHistoryV2[];
    userName: string;
    no: number;
    type: string;
    amount: number;
    status: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateBillingStatusRequest {
    status: "PENDING" | "PAID" | "FAILED";
}

export interface GenerateMonthlyRentRequest {
    // Add any parameters needed for generating monthly rent
}

