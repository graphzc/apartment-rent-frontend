const roomQueryKeys = {
    all: ['room'],
    detail: (id: number) => [...roomQueryKeys.all, id],
};

export default roomQueryKeys;