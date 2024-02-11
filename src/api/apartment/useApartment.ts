import Apartment from "@/interface/Apartment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import apartmentQueryKeys from "./apartmentQueryKey";

const fetchApartment = async (id: number) => {
    const { data } = await axios.get<Apartment>(`/apartment/${id}`);
    return data;
};

const useApartment = (id: number) => {
    return useQuery({
        queryKey: apartmentQueryKeys.detail(id),
        queryFn: async () => fetchApartment(id),
    });
};

export default useApartment;