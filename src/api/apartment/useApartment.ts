import Apartment from "@/interface/Apartment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import apartmentQueryKeys from "./apartmentQueryKey";

const fetchApartment = async (id: string) => {
    const { data } = await axios.get<Apartment>(`/apartments/${id}`);
    return data;
};

const useApartment = (id: string) => {
    return useQuery({
        queryKey: apartmentQueryKeys.detail(id),
        queryFn: async () => fetchApartment(id),
    });
};

export default useApartment;