const utilityAdminQueryKeys = {
    all: ['admin-utilities'],
    detail: (id: string) => [...utilityAdminQueryKeys.all, id],
    list: () => [...utilityAdminQueryKeys.all, 'list'],
};

export default utilityAdminQueryKeys;
