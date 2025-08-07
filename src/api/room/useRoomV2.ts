import { RoomV2 } from "@/interface/RoomV2";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const fetchRoomV2 = async (id: string) => {
    const session = await getSession();
    const { data } = await axios.get<RoomV2>(`/admin/rooms/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useRoomV2 = (id: string) => {
    return useQuery({
        queryKey: ["rooms", id],
        queryFn: () => fetchRoomV2(id),
        enabled: !!id,
    });
};

export default useRoomV2;
