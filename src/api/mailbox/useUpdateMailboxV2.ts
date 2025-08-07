import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { UpdateMailboxRequest, MailboxActionResponse } from "@/interface/requests/MailboxV2Request";
import { mailboxV2QueryKeys } from "./mailboxV2QueryKey";
import Swal from "sweetalert2";

const useUpdateMailboxV2 = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateMailboxRequest }): Promise<MailboxActionResponse> => {
            const response = await axiosConfig.put(`/admin/mailboxes/${id}`, data, {
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
                text: "แก้ไขข้อความเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: () => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่สามารถแก้ไขข้อความได้",
                icon: "error",
                confirmButtonText: "ตกลง",
            });
        },
    });
};

export default useUpdateMailboxV2;
