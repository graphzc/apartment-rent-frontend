import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { AdminChangePasswordRequest, UserActionResponse } from "@/interface/requests/AdminUserRequest";
import adminUserQueryKeys from "./adminUserQueryKey";
import Swal from "sweetalert2";

const useChangeAdminUserPassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: AdminChangePasswordRequest }): Promise<UserActionResponse> => {
            const session = await getSession();
            const response = await axios.post(`/admin/users/${id}/change-password`, data, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                }
            });
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: adminUserQueryKeys.all });
            Swal.fire({
                title: "สำเร็จ!",
                text: data.message || "เปลี่ยนรหัสผ่านสำเร็จ",
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถเปลี่ยนรหัสผ่านได้",
                icon: "error"
            });
        },
    });
};

export default useChangeAdminUserPassword;
