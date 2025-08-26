import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { HideMailboxRequest, MailboxActionResponse } from "@/interface/requests/MailboxV2Request";
import { mailboxV2QueryKeys } from "./mailboxV2QueryKey";
import mailboxQueryKeys from "./mailboxQueryKey";
import Swal from "sweetalert2";

const useHideMailbox = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation({
        mutationFn: async ({ id, isHideFromUser }: { id: string; isHideFromUser: boolean }): Promise<MailboxActionResponse> => {
            const response = await axiosConfig.put(`/mailboxes/${id}/hide`,
                { isHideFromUser } as HideMailboxRequest,
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );
            return response.data;
        },
        onSuccess: (_, { isHideFromUser }) => {
            // Invalidate both v1 and v2 queries
            queryClient.invalidateQueries({ queryKey: mailboxQueryKeys.all });
            queryClient.invalidateQueries({ queryKey: mailboxV2QueryKeys.all });

            Swal.fire({
                title: "สำเร็จ!",
                text: isHideFromUser ? "ซ่อนข้อความจากผู้ใช้แล้ว" : "แสดงข้อความให้ผู้ใช้แล้ว",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: () => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่สามารถดำเนินการได้",
                icon: "error",
                confirmButtonText: "ตกลง",
            });
        },
    });
};

export default useHideMailbox;
