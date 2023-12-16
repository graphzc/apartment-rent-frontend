import RegisterSchema from "@/interface/RegisterSchema";
import User from "@/interface/User";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";
import userQueryKeys from "./userQueryKey";
import { useRouter } from "next/navigation";
import { errorAlert } from "@/lib/sweetAlert";

const register = async (newUser: RegisterSchema) => {
    const session = await getSession();

    const { data, status } = await axios.post<User>("/auth/register", newUser, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });

    return data
}

const useRegister = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: register,
        onSuccess: async (data) => {
            // signIn('credentials', {
            //     email: data.email,
            //     password: data.password,
            //     redirect: false,
            // }).then((res) => {
            //     if (res?.ok === true) {
            //         router.replace('/');
            //     }
            // }).catch((err) => {
            //     errorAlert({
            //         title: 'Login failed',
            //         text: 'Server error please try again later',
            //     });
            // });
        },
    })
}

export default useRegister;