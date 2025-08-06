export enum RoomStatus {
    AVAILABLE = "AVAILABLE",
    RESERVED = "RESERVED", 
    RENTED = "RENTED",
    INACTIVE = "INACTIVE"
}

export interface RoomV2 {
    id: string;
    apartmentId: string;
    no: string;
    description?: string;
    monthlyPrice: number;
    securityDeposit: number;
    address: string;
    status: RoomStatus;
    createdAt: Date;
    updatedAt: Date;
}
