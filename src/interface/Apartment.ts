import Room from "./Room";

export default interface Apartment {
    id: number;
    name: string;
    room: Room[];
    createdAt: Date;
    updatedAt: Date;
}