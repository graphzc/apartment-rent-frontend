import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { MailboxActionResponse } from "@/interface/requests/MailboxV2Request";
import { mailboxV2QueryKeys } from "./mailboxV2QueryKey";
import Swal from "sweetalert2";

const useDeleteMailboxV2 = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation({
        mutationFn: async (id: string): Promise<MailboxActionResponse> => {
            const response = await axiosConfig.delete(`/admin/mailboxes/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: mailboxV2QueryKeys.all });
            Swal.fire({
                title: "สำเร็จ!",
                text: "ลบข้อความเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: () => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่สามารถลบข้อความได้",
                icon: "error",
                confirmButtonText: "ตกลง",
            });
        },
    });
};

export default useDeleteMailboxV2;
