import Room from "@/interface/Room";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import roomQueryKeys from "./roomQueryKey";

const fetchRooms = async () => {
    const { data } = await axios.get<Room[]>("/room");
    return data;
};

const useRooms = () => {
    return useQuery({
        queryKey: roomQueryKeys.all,
        queryFn: fetchRooms,
    });
};

export default useRooms;