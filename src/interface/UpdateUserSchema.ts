import { Gender } from "@/enum/Gender";

export interface UpdateUserRequest {
    name: string;
    telephone: string;
    gender: Gender;
    age: number;
}
