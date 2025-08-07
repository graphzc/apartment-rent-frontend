export interface BookingV2 {
    id: string;
    roomInfo: BookingRoomInfo;
    apartmentInfo: BookingApartmentInfo;
    userInfo: BookingUserInfo;
    price: BookingPrice;
    startDate: Date;
    endDate: Date;
    isAcceptedContract: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookingRoomInfo {
    id: string;
    no: string;
    address: string;
}

export interface BookingApartmentInfo {
    id: string;
    name: string;
}

export interface BookingUserInfo {
    id: string;
    name: string;
    telephone: string;
    email: string;
    address: string;
}

export interface BookingPrice {
    securityDeposit: number;
    monthlyRent: number;
    totalFirstPay: number;
    plumbingPrice: number;
    electricityPrice: number;
}
