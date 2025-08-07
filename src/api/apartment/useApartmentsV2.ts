import Apartment from "@/interface/Apartment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const fetchApartmentsV2 = async () => {
    const session = await getSession();
    const { data } = await axios.get<Apartment[]>("/apartments", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useApartmentsV2 = () => {
    return useQuery({
        queryKey: ["apartments"],
        queryFn: fetchApartmentsV2,
    });
};

export default useApartmentsV2;
