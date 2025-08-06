const userQueryKeys = {
    all:['user'],
    me: ['user', 'me'],
    detail: (id: string) => [...userQueryKeys.all, id],
};

export default userQueryKeys;