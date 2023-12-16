import Payment from "./Payment";

export default interface Booking {
    id?: string;
    roomId?: number;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
    duration?: number;
    createdAt?: Date;
    updatedAt?: Date;
    payment?: Payment[];
}