import Apartment from "@/interface/Apartment";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const createApartment = async (apartment: Apartment) => {
    const session = await getSession();
    const { data } = await axios.post<Apartment>("/admin/apartment", apartment, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useCreateApartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createApartment,
    })

};

export default useCreateApartment;