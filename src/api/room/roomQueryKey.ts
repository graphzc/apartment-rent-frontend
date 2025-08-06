const roomQueryKeys = {
    all: ['room'],
    detail: (id: string) => [...roomQueryKeys.all, id],
};

export default roomQueryKeys;