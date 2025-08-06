import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { CreateMailboxRequest, MailboxActionResponse } from "@/interface/requests/MailboxV2Request";
import { mailboxV2QueryKeys } from "./mailboxV2QueryKey";
import Swal from "sweetalert2";

const useCreateMailboxV2 = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation({
        mutationFn: async (data: CreateMailboxRequest): Promise<MailboxActionResponse> => {
            const response = await axiosConfig.post("/admin/mailboxes", data, {
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
                text: "เพิ่มข้อความเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: () => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่สามารถเพิ่มข้อความได้",
                icon: "error",
                confirmButtonText: "ตกลง",
            });
        },
    });
};

export default useCreateMailboxV2;
