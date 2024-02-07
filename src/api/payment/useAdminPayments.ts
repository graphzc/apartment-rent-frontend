import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import paymentQueryKeys from "./paymentQueryKey";
import { getSession } from "next-auth/react";

const fetchPayments = async () => {
    const session = await getSession();
    const { data } = await axios.get<Payment[]>("/admin/payment", {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useAdminPayments = () => {
    return useQuery({
        queryKey: paymentQueryKeys.all,
        queryFn: fetchPayments,
    });
};

export default useAdminPayments;