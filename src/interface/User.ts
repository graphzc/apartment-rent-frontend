import { Gender } from "@/enum/Gender";
import { UserRole } from "@/enum/UserRole"

export default interface User {
    id?: string;
    email?: string;
    name?: string;
    password?: string;
    role?: UserRole;
    telephone?: string;
    age?: number;
    gender?: Gender;
}


export interface UserInfo {
    id: string;
    email: string;
    name: string;
    telephone: string;
    gender: Gender;
    age: number;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}