import Booking from "./Booking";

export default interface Utility {
    id: number;
    forMonth: Date;
    electricity: number;
    plumbing: number;
    bookingId: number;
    booking: Booking;
}