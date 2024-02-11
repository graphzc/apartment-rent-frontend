import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import roomQueryKeys from "./roomQueryKey";
import Room from "@/interface/Room";

const updateRoom = async (room: Room) => {
    const session = await getSession();

    const { data } = await axios.put<Payment>(`/admin/room/${room.id}`, room, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useUpdateRoom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRoom,
        onSuccess: ( data ) => {
            queryClient.invalidateQueries({ queryKey: roomQueryKeys.all });
        },
    });
}

export default useUpdateRoom;
