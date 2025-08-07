export const mailboxV2QueryKeys = {
    all: ["mailboxes", "v2"] as const,
    lists: () => [...mailboxV2QueryKeys.all, "list"] as const,
    list: (filters: Record<string, unknown>) => [...mailboxV2QueryKeys.lists(), { filters }] as const,
    details: () => [...mailboxV2QueryKeys.all, "detail"] as const,
    detail: (id: string) => [...mailboxV2QueryKeys.details(), id] as const,
};
