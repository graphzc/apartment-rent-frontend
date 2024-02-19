import Utility from "@/interface/Utility";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import utilityQueryKeys from "./utilityQueryKey";
import paymentQueryKeys from "../payment/paymentQueryKey";

const createUtility = async (utility: Utility) => {
    const session = await getSession();
    const { data } = await axios.post<Utility>("/admin/utility", utility, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useCreateUtility = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUtility,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: utilityQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: paymentQueryKeys.all
            });
        },
    })

};

export default useCreateUtility;