import User from "@/interface/User";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import userQueryKeys from "./userQueryKey";

const deleteUser = async (userId: string) => {
    const session = await getSession();
    const { data } = await axios.delete<User>(`/admin/user/${userId}`, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userQueryKeys.all})
        }
    })

};

export default useCreateUser;