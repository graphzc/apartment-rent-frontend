import Utility from "@/interface/Utility";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import utilityAdminQueryKeys from "./utilityAdminQueryKey";

const fetchAdminUtility = async (id: string) => {
    const session = await getSession();
    const { data } = await axios.get<Utility>(`/admin/utilities/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useAdminUtility = (id: string) => {
    return useQuery({
        queryKey: utilityAdminQueryKeys.detail(id),
        queryFn: () => fetchAdminUtility(id),
        enabled: !!id,
    });
};

export default useAdminUtility;
