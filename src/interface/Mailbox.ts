interface Mailbox {
    id: string;
    toBookingId: string;
    title: string;
    content: string;
    readAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export default Mailbox;
