export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface ChangePasswordSchema extends ChangePasswordRequest {
    confirmPassword: string;
}
