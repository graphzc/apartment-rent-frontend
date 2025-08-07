import { CreateRoomRequest } from "@/interface/requests/RoomRequest";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const createRoom = async (room: CreateRoomRequest) => {
    const session = await getSession();
    const { data } = await axios.post("/admin/room", room, {
        headers: {
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