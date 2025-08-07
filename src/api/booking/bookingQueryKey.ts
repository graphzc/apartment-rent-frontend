const bookingQueryKeys = {
    all: ['booking'],
    detail: (id: number) => [...bookingQueryKeys.all, id],
    my: ['my-booking'],
    myDetail: (id: string) => [...bookingQueryKeys.my, id],
};

export default bookingQueryKeys;