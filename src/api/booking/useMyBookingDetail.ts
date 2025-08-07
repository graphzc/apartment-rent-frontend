import Booking from "@/interface/Booking";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import bookingQueryKeys from "./bookingQueryKey";
import { getSession } from "next-auth/react";

const fetchMyBookingDetail = async (id: string) => {
    const session = await getSession();
    const { data } = await axios.get<Booking>(`/bookings/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useMyBookingDetail = (id: string) => {
    return useQuery({
        queryKey: bookingQueryKeys.myDetail(id),
        queryFn: async () => fetchMyBookingDetail(id),
        enabled: !!id,
    });
};

export default useMyBookingDetail;
