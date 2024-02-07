import Payment from "./Payment";
import Room from "./Room";
import User from "./User";

export default interface Booking {
    id: number;
    room: Room;
    roomId: number;
    user: User;
    userId: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    payment: Payment[];
}