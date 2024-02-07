import Apartment from "./Apartment";
import Booking from "./Booking";

export default interface Room {
    id: number;
    no: string;
    apartment: Apartment
    apartmentId: number;
    booking: Booking[];
    createdAt?: Date;
    updatedAt?: Date;
    price: number;
}
