import Mailbox from "@/interface/Mailbox";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import mailboxQueryKeys from "./mailboxQueryKey";
import { getSession } from "next-auth/react";

const fetchMailboxDetail = async (id: string) => {
    const session = await getSession();
    const { data } = await axios.get<Mailbox>(`/mailboxes/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useMailboxDetail = (id: string) => {
    return useQuery({
        queryKey: mailboxQueryKeys.detail(id),
        queryFn: () => fetchMailboxDetail(id),
        enabled: !!id,
    });
};

export default useMailboxDetail;
