export interface CreateRoomRequest {
    no: string;
    description?: string;
    apartmentId: string;
    monthlyPrice: number;
    securityDeposit: number;
    address: string;
}

export interface UpdateRoomRequest {
    no: string;
    description?: string;
    apartmentId: string;
    monthlyPrice: number;
    securityDeposit: number;
    address: string;
}

export interface RoomActionResponse {
    message: string;
}
