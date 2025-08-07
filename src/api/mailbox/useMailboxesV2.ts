import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { MailboxV2 } from "@/interface/MailboxV2";
import { mailboxV2QueryKeys } from "./mailboxV2QueryKey";

const useMailboxesV2 = () => {
    const { data: session } = useSession();

    return useQuery({
        queryKey: mailboxV2QueryKeys.lists(),
        queryFn: async (): Promise<MailboxV2[]> => {
            const response = await axiosConfig.get("/admin/mailboxes", {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            return response.data;
        },
        enabled: !!session?.accessToken,
    });
};

export default useMailboxesV2;
