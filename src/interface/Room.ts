import Booking from "./Booking";

export default interface Room {
    id?: string;
    no?: number;
    apartmentId?: number;
    booking?: Booking[];
    createdAt?: Date;
    updatedAt?: Date;
}
