import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { CreateRoomRequest, RoomActionResponse } from "@/interface/requests/RoomV2Request";
import Swal from "sweetalert2";

const useCreateRoomV2 = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateRoomRequest): Promise<RoomActionResponse> => {
            const session = await getSession();
            const response = await axios.post("/admin/rooms", data, {
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
                text: data.message || "เพิ่มห้องพักสำเร็จ",
                icon: "success"
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถเพิ่มห้องพักได้",
                icon: "error"
            });
        }
    });
};

export default useCreateRoomV2;
