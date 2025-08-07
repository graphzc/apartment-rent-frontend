import { UserInfo } from "@/interface/User";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import userQueryKeys from "./userQueryKey";

const getUserInfo = async () => {
    const session = await getSession();
    const { data } = await axios.get<UserInfo>("/users/info", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    return data
}

const useMyUserInfo = () => {
    return useQuery({
        queryKey: userQueryKeys.me,
        queryFn: getUserInfo,
    })
}

export default useMyUserInfo;