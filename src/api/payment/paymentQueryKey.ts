const paymentQueryKeys = {
    all: ['payment'],
    detail: (id: number) => [...paymentQueryKeys.all, id],
};

export default paymentQueryKeys;