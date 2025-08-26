/**
 * Mailbox interface representing a message/notification in the system
 */
interface Mailbox {
    id: string;
    toBookingId: string;
    title: string;
    content: string;
    readAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isHideFromUser: boolean; // User-controlled flag to hide their own mailboxes
}

export default Mailbox;
