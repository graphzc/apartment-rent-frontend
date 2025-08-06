import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { UpdateRoomRequest, RoomActionResponse } from "@/interface/requests/RoomV2Request";
import Swal from "sweetalert2";

const useUpdateRoomV2 = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateRoomRequest }): Promise<RoomActionResponse> => {
            const session = await getSession();
            const response = await axios.put(`/admin/rooms/${id}`, data, {
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
                text: data.message || "อัปเดตห้องพักสำเร็จ",
                icon: "success"
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถอัปเดตห้องพักได้",
                icon: "error"
            });
        }
    });
};

export default useUpdateRoomV2;
