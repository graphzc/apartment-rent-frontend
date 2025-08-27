import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { bookingV2QueryKeys } from "./bookingV2QueryKey";

interface TerminateBookingResponse {
    success: boolean;
    message: string;
}

const useTerminateBooking = () => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            bookingId: string
        ): Promise<TerminateBookingResponse> => {
            const response = await axiosConfig.put(
                `/admin/bookings/${bookingId}/terminate`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );
            return response.data;
        },
        onSuccess: (_data, bookingId) => {
            // Invalidate the booking detail to refresh the data
            queryClient.invalidateQueries({
                queryKey: bookingV2QueryKeys.detail(bookingId),
            });
            // Invalidate the bookings list to update the status there as well
            queryClient.invalidateQueries({
                queryKey: bookingV2QueryKeys.lists(),
            });
        },
    });
};

export default useTerminateBooking;
