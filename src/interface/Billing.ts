interface PaymentHistory {
  id: string;
  slipImage: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface Billing {
    id: string;
    bookingId: string;
    billingReference: string;
    paymentHistory: PaymentHistory[];
    userName: string;
    no: number;
    type: string;
    amount: number;
    status: string;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
