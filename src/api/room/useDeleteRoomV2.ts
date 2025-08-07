import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { RoomActionResponse } from "@/interface/requests/RoomV2Request";
import Swal from "sweetalert2";

const useDeleteRoomV2 = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<RoomActionResponse> => {
            const session = await getSession();
            const response = await axios.delete(`/admin/rooms/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                }
            });
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            Swal.fire({
                title: "สำเร็จ!",
                text: data.message || "ลบห้องพักสำเร็จ",
                icon: "success"
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถลบห้องพักได้",
                icon: "error"
            });
        }
    });
};

export default useDeleteRoomV2;
