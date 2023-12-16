import Room from "./Room";

export default interface Apartment {
    id?: string;
    name?: string;
    room?: Room[];
    createdAt?: Date;
    updatedAt?: Date;
}