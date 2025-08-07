import Booking from "@/interface/Booking";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import bookingQueryKeys from "./bookingQueryKey";
import { getSession } from "next-auth/react";

const fetchBookings = async () => {
    const session = await getSession();
    const { data } = await axios.get<Booking[]>("/admin/bookings", {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useBookings = () => {
    return useQuery({
        queryKey: bookingQueryKeys.all,
        queryFn: fetchBookings,
    });
};

export default useBookings;