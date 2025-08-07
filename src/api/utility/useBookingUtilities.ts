import BookingUtility from "@/interface/BookingUtility";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import utilityQueryKeys from "./utilityQueryKey";
import { getSession } from "next-auth/react";

const fetchBookingUtilities = async (bookingId: string) => {
    const session = await getSession();
    const { data } = await axios.get<BookingUtility[]>(`/bookings/${bookingId}/utilities`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useBookingUtilities = (bookingId: string) => {
    return useQuery({
        queryKey: utilityQueryKeys.byBooking(bookingId),
        queryFn: async () => fetchBookingUtilities(bookingId),
    });
};

export default useBookingUtilities;
