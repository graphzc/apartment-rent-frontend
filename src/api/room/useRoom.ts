import Room from "@/interface/Room";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import roomQueryKeys from "./roomQueryKey";

const fetchRoom = async (id: string) => {
    const { data } = await axios.get<Room>(`/rooms/${id}`);

    return data;
};

const useRoom = (id: string) => {
    return useQuery({
        queryKey: roomQueryKeys.detail(id),
        queryFn: async () => fetchRoom(id),
    });
};

export default useRoom;