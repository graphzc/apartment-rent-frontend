import { UserRole } from "@/enum/UserRole"

export default interface User {
    id?: string;
    email?: string;
    name?: string;
    role?: UserRole;
}