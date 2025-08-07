import { UserInfo } from "@/interface/User";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import adminUserQueryKeys from "./adminUserQueryKey";

const fetchAdminUsers = async () => {
    const session = await getSession();
    const { data } = await axios.get<UserInfo[]>("/admin/users", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useAdminUsers = () => {
    return useQuery({
        queryKey: adminUserQueryKeys.all,
        queryFn: fetchAdminUsers,
    });
};

export default useAdminUsers;
