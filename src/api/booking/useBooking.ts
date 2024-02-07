import Booking from "@/interface/Booking";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import bookingQueryKeys from "./bookingQueryKey";

const fetchBooking = async (id: number) => {
    const { data } = await axios.get<Booking>(`/booking/${id}`);
    return data;
};

const useBooking = (id: number) => {
    return useQuery({
        queryKey: bookingQueryKeys.all,
        queryFn: async () => fetchBooking(id),
    });
};

export default useBooking;