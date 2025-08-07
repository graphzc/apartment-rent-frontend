import { UserInfo } from "@/interface/User";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import adminUserQueryKeys from "./adminUserQueryKey";

const fetchAdminUser = async (id: string) => {
    const session = await getSession();
    const { data } = await axios.get<UserInfo>(`/admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useAdminUser = (id: string) => {
    return useQuery({
        queryKey: adminUserQueryKeys.detail(id),
        queryFn: () => fetchAdminUser(id),
        enabled: !!id,
    });
};

export default useAdminUser;
