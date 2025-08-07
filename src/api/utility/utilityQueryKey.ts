const utilityQueryKeys = {
    all: ['utility'],
    detail: (id: number) => [...utilityQueryKeys.all, id],
    byBooking: (bookingId: string) => [...utilityQueryKeys.all, 'booking', bookingId],
};

export default utilityQueryKeys;