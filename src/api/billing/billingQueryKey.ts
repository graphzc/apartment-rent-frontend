const billingQueryKeys = {
    all: ["billing"],
    list: (bookingId: string) => [...billingQueryKeys.all, "list", bookingId],
    detail: (billingId: string) => [...billingQueryKeys.all, "detail", billingId],
};

export default billingQueryKeys;
