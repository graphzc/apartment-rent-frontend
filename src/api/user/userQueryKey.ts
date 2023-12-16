const userQueryKeys = {
    all:['user'],
    detail: (id: string) => [...userQueryKeys.all, id],
};

export default userQueryKeys;