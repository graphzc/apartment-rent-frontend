import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { CreateUtilityRequest, UtilityActionResponse } from "@/interface/requests/UtilityRequest";
import utilityAdminQueryKeys from "./utilityAdminQueryKey";
import Swal from "sweetalert2";

const useCreateAdminUtility = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateUtilityRequest): Promise<UtilityActionResponse> => {
            const session = await getSession();
            const response = await axios.post("/admin/utilities", data, {
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
                text: data.message || "เพิ่มข้อมูลสาธารณูปโภคสำเร็จ",
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถเพิ่มข้อมูลสาธารณูปโภคได้",
                icon: "error"
            });
        },
    });
};

export default useCreateAdminUtility;
