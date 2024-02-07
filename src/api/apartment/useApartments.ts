import Apartment from "@/interface/Apartment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import apartmentQueryKeys from "./apartmentQueryKey";

const fetchApartments = async () => {
    const { data } = await axios.get<Apartment[]>("/apartment");
    return data;
};

const useApartments = () => {
    return useQuery({
        queryKey: apartmentQueryKeys.all,
        queryFn: fetchApartments,
    });
};

export default useApartments;