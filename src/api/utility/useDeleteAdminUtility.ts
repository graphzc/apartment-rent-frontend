import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { UtilityActionResponse } from "@/interface/requests/UtilityRequest";
import utilityAdminQueryKeys from "./utilityAdminQueryKey";
import Swal from "sweetalert2";

const useDeleteAdminUtility = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<UtilityActionResponse> => {
            const session = await getSession();
            const response = await axios.delete(`/admin/utilities/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });

            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: utilityAdminQueryKeys.all });
            Swal.fire({
                title: "สำเร็จ!",
                text: data.message || "ลบข้อมูลสาธารณูปโภคสำเร็จ",
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถลบข้อมูลสาธารณูปโภคได้",
                icon: "error"
            });
        },
    });
};

export default useDeleteAdminUtility;
