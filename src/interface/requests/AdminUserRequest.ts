import { Gender } from "@/enum/Gender";
import { UserRole } from "@/enum/UserRole";

export interface AdminUpdateUserRequest {
    name: string;
    telephone: string;
    gender: Gender;
    age: number;
    role: UserRole;
}

export interface AdminChangePasswordRequest {
    newPassword: string;
}

export interface UserActionResponse {
    message: string;
    user?: any;
}
