import User from "@/interface/User";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import userQueryKeys from "./userQueryKey";
import { getSession } from "next-auth/react";

const fetchUsers = async () => {
    const session = await getSession();
    const { data } = await axios.get<User[]>("/admin/user", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    
    });
    return data;
};

const useUsers = () => {
    return useQuery({
        queryKey: userQueryKeys.all,
        queryFn: fetchUsers,
    });
};

export default useUsers;