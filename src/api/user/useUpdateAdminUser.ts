import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { AdminUpdateUserRequest, UserActionResponse } from "@/interface/requests/AdminUserRequest";
import adminUserQueryKeys from "./adminUserQueryKey";
import Swal from "sweetalert2";

const useUpdateAdminUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: AdminUpdateUserRequest }): Promise<UserActionResponse> => {
            const session = await getSession();
            const response = await axios.put(`/admin/users/${id}`, data, {
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
                text: data.message || "อัปเดตข้อมูลผู้ใช้สำเร็จ",
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้",
                icon: "error"
            });
        },
    });
};

export default useUpdateAdminUser;
