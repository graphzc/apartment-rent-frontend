import Apartment from "@/interface/Apartment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const fetchApartmentV2 = async (id: string) => {
    const session = await getSession();
    const { data } = await axios.get<Apartment>(`/apartments/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useApartmentV2 = (id: string) => {
    return useQuery({
        queryKey: ["apartments", id],
        queryFn: () => fetchApartmentV2(id),
        enabled: !!id,
    });
};

export default useApartmentV2;
