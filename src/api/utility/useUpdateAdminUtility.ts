import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { UpdateUtilityRequest, UtilityActionResponse } from "@/interface/requests/UtilityRequest";
import utilityAdminQueryKeys from "./utilityAdminQueryKey";
import Swal from "sweetalert2";

const useUpdateAdminUtility = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateUtilityRequest }): Promise<UtilityActionResponse> => {
            const session = await getSession();
            const response = await axios.put(`/admin/utilities/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                }
            });
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: utilityAdminQueryKeys.all });
            Swal.fire({
                title: "สำเร็จ!",
                text: data.message || "อัปเดตข้อมูลสาธารณูปโภคสำเร็จ",
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลสาธารณูปโภคได้",
                icon: "error"
            });
        },
    });
};

export default useUpdateAdminUtility;
