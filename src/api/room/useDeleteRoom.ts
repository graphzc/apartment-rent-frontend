import Room from "@/interface/Room";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import roomQueryKeys from "./roomQueryKey";

const deleteRoom = async (roomId: number) => {
    const session = await getSession();
    const { data } = await axios.delete<Room>(`/admin/room/${roomId}`, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useCreateRoom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roomQueryKeys.all})
        }
    })

};

export default useCreateRoom;