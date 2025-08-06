import { PaymentStatus } from "@/enum/PaymentStatus";
import Payment from "./Payment";
import Room from "./Room";
import User from "./User";
import Utility from "./Utility";
import { BookingStatus } from "@/enum/BookingStatus";

// {
//     "id": "6892420e51b4a06f2f9b28a1",
//     "roomInfo": {
//         "id": "689240aad02f734ad262d680",
//         "no": "101",
//         "address": "MOCK_ADDRESS"
//     },
//     "apartmentInfo": {
//         "id": "688f1479d7736bcaf7ea9e58",
//         "name": "Apartment 1"
//     },
//     "userInfo": {
//         "id": "68923fab975f13785ae1d08d",
//         "name": "Tanaroeg O-Charoen",
//         "telephone": "0831189088",
//         "email": "graph234@gmail.com",
//         "address": "MOCK_USER_ADDRESS"
//     },
//     "billingReference": "IV20250806-0002",
//     "price": {
//         "securityDeposit": 7000,
//         "monthlyRent": 3500,
//         "totalFirstPay": 10500,
//         "plumbingPrice": 20,
//         "electricityPrice": 10
//     },
//     "startDate": "2025-08-03T00:00:00Z",
//     "endDate": "2026-02-03T00:00:00Z",
//     "isAcceptedContract": true,
//     "status": "PENDING_FOR_PAYMENT",
//     "createdAt": "2025-08-05T17:40:30.906Z",
//     "updatedAt": "2025-08-05T17:40:30.906Z"
// }

export default interface Booking {
    id: string;
    roomInfo: {
        id: string;
        no: string;
        address: string;
    };
    apartmentInfo: {
        id: string;
        name: string;
    };
    userInfo: {
        id: string;
        name: string;
        telephone: string;
        email: string;
        address: string;
    };
    billingReference: string;
    price: {
        securityDeposit: number;
        monthlyRent: number;
        totalFirstPay: number;
        plumbingPrice: number;
        electricityPrice: number;
    };
    startDate: Date;
    endDate: Date;
    isAcceptedContract: boolean;
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookingRequest {
    userAddress: string;
    userName: string;
    userTelephone: string;
    userEmail: string;
    roomId: string;
    startDate: Date;
    endDate: Date;
}

export interface CreateBookingForm {
    userAddress: string;
    userName: string;
    userTelephone: string;
    userEmail: string;
    roomId: string;
    startDate: string;
    duration: number;
}
