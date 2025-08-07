export interface MailboxV2 {
    id: string;
    toBookingId: string;
    title: string;
    content: string;
    readAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
