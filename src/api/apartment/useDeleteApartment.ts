import Apartment from "@/interface/Apartment";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import apartmentQueryKeys from "./apartmentQueryKey";

const deleteApartment = async (apartmentId: number) => {
    const session = await getSession();
    const { data } = await axios.delete<Apartment>(`/admin/apartment/${apartmentId}`, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useCreateApartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteApartment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: apartmentQueryKeys.all})
        }
    })

};

export default useCreateApartment;