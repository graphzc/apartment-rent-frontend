import Mailbox from "@/interface/Mailbox";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import mailboxQueryKeys from "./mailboxQueryKey";
import { getSession } from "next-auth/react";

const fetchMailboxes = async (bookingId: string) => {
    const session = await getSession();

    const { data } = await axios.get<Mailbox[]>(`/bookings/${bookingId}/mailboxes`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    return data;
};

const useMailboxes = (bookingId: string, includeAll: boolean = false) => {
    return useQuery({
        queryKey: mailboxQueryKeys.list(bookingId),
        queryFn: () => fetchMailboxes(bookingId),
        enabled: !!bookingId,
    });
};

export default useMailboxes;
