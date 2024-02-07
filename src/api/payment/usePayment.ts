import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import paymentQueryKeys from "./paymentQueryKey";

const fetchPayment = async (id: number) => {
    const { data } = await axios.get<Payment>(`/payment/${id}`);
    return data;
};

const usePayment = (id: number) => {
    return useQuery({
        queryKey: paymentQueryKeys.detail(id),
        queryFn: async () => fetchPayment(id),
    });
};

export default usePayment;