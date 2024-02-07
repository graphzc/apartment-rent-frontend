import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import paymentQueryKeys from "./paymentQueryKey";
import { getSession } from "next-auth/react";

const fetchPayment = async (id: number) => {
    const session = await getSession();
    const { data } = await axios.get<Payment>(`/admin/payment/${id}`, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useAdminPayment = (id: number) => {
    return useQuery({
        queryKey: paymentQueryKeys.detail(id),
        queryFn: async () => fetchPayment(id),
    });
};

export default useAdminPayment;