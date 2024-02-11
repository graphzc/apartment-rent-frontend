import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import apartmentQueryKeys from "./apartmentQueryKey";
import Apartment from "@/interface/Apartment";

const updateApartment = async (apartment: Apartment) => {
    const session = await getSession();

    const { data } = await axios.put<Payment>(`/admin/apartment/${apartment.id}`, apartment, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useUpdateApartment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateApartment,
        onSuccess: ( data ) => {
            queryClient.invalidateQueries({ queryKey: apartmentQueryKeys.all });
        },
    });
}

export default useUpdateApartment;
