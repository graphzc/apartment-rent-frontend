import { CreateBookingRequest } from "@/interface/Booking";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import bookingQueryKeys from "./bookingQueryKey";

const createBooking = async (booking: CreateBookingRequest) => {
    const session = await getSession();
    const { data } = await axios.post<CreateBookingRequest>("/bookings", booking, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    return data;
}

const useCreateBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: bookingQueryKeys.all });
        },
    })

};

export default useCreateBooking;