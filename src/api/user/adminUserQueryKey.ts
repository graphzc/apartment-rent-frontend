const adminUserQueryKeys = {
    all: ['admin-users'],
    detail: (id: string) => [...adminUserQueryKeys.all, id],
    list: () => [...adminUserQueryKeys.all, 'list'],
};

export default adminUserQueryKeys;
