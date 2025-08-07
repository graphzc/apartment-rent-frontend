import { UpdateApartmentRequest } from "@/interface/requests/ApartmentRequest";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import apartmentQueryKeys from "./apartmentQueryKey";

const updateApartment = async ({ id, apartment }: { id: string, apartment: UpdateApartmentRequest }) => {
    const session = await getSession();

    const { data } = await axios.put(`/admin/apartment/${id}`, apartment, {
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: apartmentQueryKeys.all });
        },
    });
}

export default useUpdateApartment;
