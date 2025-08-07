const apartmentQueryKeys = {
    all: ['apartment'],
    detail: (id: string) => [...apartmentQueryKeys.all, id],
};

export default apartmentQueryKeys;