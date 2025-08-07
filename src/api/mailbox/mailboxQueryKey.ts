const mailboxQueryKeys = {
    all: ['mailbox'],
    list: (bookingId: string) => [...mailboxQueryKeys.all, 'list', bookingId],
    detail: (id: string) => [...mailboxQueryKeys.all, 'detail', id],
};

export default mailboxQueryKeys;
