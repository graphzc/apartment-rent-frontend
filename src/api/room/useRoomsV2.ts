import { RoomV2 } from "@/interface/RoomV2";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const fetchRoomsV2 = async () => {
    const session = await getSession();
    const { data } = await axios.get<RoomV2[]>("/admin/rooms", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useRoomsV2 = () => {
    return useQuery({
        queryKey: ["rooms"],
        queryFn: fetchRoomsV2,
    });
};

export default useRoomsV2;
