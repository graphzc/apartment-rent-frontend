import Room from "./Room";

export default interface Apartment {
    id: string;
    name: string;
    description: string;
    plumbingPrice: number;
    electricityPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApartmentWithRooms extends Apartment {
    rooms: Room[];
}
