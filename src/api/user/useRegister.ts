import RegisterSchema from "@/interface/RegisterSchema";
import User from "@/interface/User";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const register = async (newUser: RegisterSchema) => {
    const { data } = await axios.post<User>("/auth/register", newUser);

    return data
}

const useRegister = () => {
    return useMutation({
        mutationFn: register,
        onSuccess: async (data) => {
        },
    })
}

export default useRegister;