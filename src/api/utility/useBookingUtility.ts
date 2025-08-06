import BookingUtility from "@/interface/BookingUtility";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import utilityQueryKeys from "./utilityQueryKey";
import { getSession } from "next-auth/react";

const fetchBookingUtility = async (id: string) => {
    const session = await getSession();
    const { data } = await axios.get<BookingUtility>(`/utilities/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useBookingUtility = (id: string) => {
    return useQuery({
        queryKey: [...utilityQueryKeys.all, 'detail', id],
        queryFn: async () => fetchBookingUtility(id),
    });
};

export default useBookingUtility;
