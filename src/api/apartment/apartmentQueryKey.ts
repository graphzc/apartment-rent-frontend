const apartmentQueryKeys = {
    all: ['apartment'],
    detail: (id: number) => [...apartmentQueryKeys.all, id],
};

export default apartmentQueryKeys;