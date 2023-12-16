import { PaymentStatus } from "@/enum/PaymentStatus";
import Booking from "./Booking";

export default interface Payment {
    id?: string;
    bookingId?: number;
    booking?: Booking;
    amount?: number;
    slip?: string;
    status?: PaymentStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

    