const newsQueryKeys = {
    all: ['news'],
    detail: (id: string | number) => [...newsQueryKeys.all, id],
};

export default newsQueryKeys;