export const bookingV2QueryKeys = {
    all: ["bookings", "v2"] as const,
    lists: () => [...bookingV2QueryKeys.all, "list"] as const,
    list: (filters: Record<string, unknown>) => [...bookingV2QueryKeys.lists(), { filters }] as const,
    details: () => [...bookingV2QueryKeys.all, "detail"] as const,
    detail: (id: string) => [...bookingV2QueryKeys.details(), id] as const,
};
