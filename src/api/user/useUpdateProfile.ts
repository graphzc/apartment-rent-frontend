import { UpdateUserRequest } from "@/interface/UpdateUserSchema";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import userQueryKeys from "./userQueryKey";

const updateProfile = async (data: UpdateUserRequest) => {
    const session = await getSession();
    const response = await axios.put("/users/profile", data, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return response.data;
};

const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            // Invalidate user info queries to refetch updated data
            queryClient.invalidateQueries({ queryKey: userQueryKeys.me });
        },
    });
};

export default useUpdateProfile;
