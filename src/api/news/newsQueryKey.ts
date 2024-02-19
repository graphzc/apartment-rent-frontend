const newsQueryKeys = {
    all: ['news'],
    detail: (id: number) => [...newsQueryKeys.all, id],
};

export default newsQueryKeys;