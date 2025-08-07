import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { UpdateNewsRequest, NewsActionResponse } from "@/interface/requests/NewsV2Request";
import { newsV2QueryKeys } from "./newsV2QueryKey";
import Swal from "sweetalert2";

const useUpdateNewsV2 = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateNewsRequest }): Promise<NewsActionResponse> => {
            const response = await axiosConfig.put(`/admin/news/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: newsV2QueryKeys.all });
            Swal.fire({
                title: "สำเร็จ!",
                text: "แก้ไขข่าวสารเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: () => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่สามารถแก้ไขข่าวสารได้",
                icon: "error",
                confirmButtonText: "ตกลง",
            });
        },
    });
};

export default useUpdateNewsV2;
