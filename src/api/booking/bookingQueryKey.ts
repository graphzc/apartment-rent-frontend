const bookingQueryKeys = {
    all: ['booking'],
    detail: (id: number) => [...bookingQueryKeys.all, id],
    my: ['my-booking'],
};

export default bookingQueryKeys;