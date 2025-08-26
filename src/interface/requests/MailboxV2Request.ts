export interface CreateMailboxRequest {
    toBookingId: string;
    title: string;
    content: string;
}

export interface UpdateMailboxRequest {
    toBookingId: string;
    title: string;
    content: string;
}

export interface HideMailboxRequest {
    isHideFromUser: boolean;
}

export interface MailboxActionResponse {
    message: string;
}
