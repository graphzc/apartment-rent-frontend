export const billingV2QueryKeys = {
    all: ['billingsV2'] as const,
    lists: () => [...billingV2QueryKeys.all, 'list'] as const,
    list: (filters?: any) => [...billingV2QueryKeys.lists(), filters] as const,
    details: () => [...billingV2QueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...billingV2QueryKeys.details(), id] as const,
};
