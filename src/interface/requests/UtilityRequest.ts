export interface CreateUtilityRequest {
    bookingId: string;
    plumbingUsage: number;
    electricityUsage: number;
}

export interface UpdateUtilityRequest {
    bookingId?: string;
    plumbingUsage?: number;
    electricityUsage?: number;
}

export interface UtilityActionResponse {
    message: string;
    utility?: any;
}