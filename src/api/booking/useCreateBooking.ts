import Booking from "@/interface/Booking";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const createBooking = async (booking: Booking) => {
    const session = await getSession();
    const { data } = await axios.post<Booking>("/booking", booking, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    
    return data;
}

const useCreateBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBooking,
    })

};

export default useCreateBooking;