export interface CreateApartmentRequest {
    name: string;
    description: string;
    plumbingPrice: number;
    electricityPrice: number;
}

export interface UpdateApartmentRequest {
    name: string;
    description: string;
    plumbingPrice: number;
    electricityPrice: number;
}

export interface ApartmentActionResponse {
    message: string;
}
