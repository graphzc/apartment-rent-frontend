import Room from "@/interface/Room";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const createRoom = async (room: Room) => {
    const session = await getSession();
    const { data } = await axios.post<Room>("/admin/room", room, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useCreateRoom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRoom,
    })

};

export default useCreateRoom;