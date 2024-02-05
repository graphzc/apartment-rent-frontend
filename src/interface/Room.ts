import Apartment from "./Apartment";
import Booking from "./Booking";

export default interface Room {
    id?: string;
    no?: number;
    apartment: Apartment
    apartmentId?: number;
    booking?: Booking[];
    createdAt?: Date;
    updatedAt?: Date;
}
