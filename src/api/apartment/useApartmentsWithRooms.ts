import { ApartmentWithRooms } from "@/interface/Apartment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import apartmentQueryKeys from "./apartmentQueryKey";

const fetchApartmentsWithRooms = async () => {
    const { data } = await axios.get<ApartmentWithRooms[]>("/apartments/with-rooms");
    return data;
};

const useApartmentsWithRooms = () => {
    return useQuery({
        queryKey: apartmentQueryKeys.all,
        queryFn: fetchApartmentsWithRooms,
    });
};

export default useApartmentsWithRooms;