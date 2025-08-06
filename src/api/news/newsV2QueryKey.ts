export const newsV2QueryKeys = {
    all: ["news", "v2"] as const,
    lists: () => [...newsV2QueryKeys.all, "list"] as const,
    list: (filters: Record<string, unknown>) => [...newsV2QueryKeys.lists(), { filters }] as const,
    details: () => [...newsV2QueryKeys.all, "detail"] as const,
    detail: (id: string) => [...newsV2QueryKeys.details(), id] as const,
};
