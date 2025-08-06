import { ChangePasswordRequest } from "@/interface/ChangePasswordSchema";
import axios from "@/lib/axios.config";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const changePassword = async (data: ChangePasswordRequest) => {
    const session = await getSession();
    const response = await axios.post("/users/change-password", data, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return response.data;
};

const useChangePassword = () => {
    return useMutation({
        mutationFn: changePassword,
    });
};

export default useChangePassword;
