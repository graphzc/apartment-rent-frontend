import Booking from "@/interface/Booking";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import bookingQueryKeys from "./bookingQueryKey";
import { getSession } from "next-auth/react";

const fetchBooking = async () => {
    const session = await getSession();
    const { data } = await axios.get<Booking[]>(`/bookings/my`, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useMyBooking = () => {
    return useQuery({
        queryKey: bookingQueryKeys.my,
        queryFn: async () => fetchBooking(),
    });
};

export default useMyBooking;