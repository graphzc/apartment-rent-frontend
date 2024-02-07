import { PaymentStatus } from "@/enum/PaymentStatus";
import Booking from "./Booking";

export default interface Payment {
    id: number;
    bookingId: number;
    booking: Booking;
    amount?: number;
    slip?: string;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}

    