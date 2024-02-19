import Payment from "./Payment";
import Room from "./Room";
import User from "./User";
import Utility from "./Utility";

export default interface Booking {
    id: number;
    room: Room;
    roomId: number;
    utilityId: number;
    utility: Utility[];
    user: User;
    userId: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    payment: Payment[];
}