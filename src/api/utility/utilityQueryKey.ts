const utilityQueryKeys = {
    all: ['utility'],
    detail: (id: number) => [...utilityQueryKeys.all, id],
};

export default utilityQueryKeys;