import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import billingQueryKeys from "./billingQueryKey";

interface PayBillingRequest {
    slipImage: string;
}

const payBilling = async (billingId: string, paymentData: PayBillingRequest) => {
    const session = await getSession();
    const { data } = await axios.post(`/billings/${billingId}/pay`, paymentData, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const usePayBilling = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ billingId, paymentData }: { billingId: string; paymentData: PayBillingRequest }) =>
            payBilling(billingId, paymentData),
        onSuccess: () => {
            // Invalidate billing queries to refresh the data
            queryClient.invalidateQueries({ queryKey: billingQueryKeys.all });
        },
    });
};

export default usePayBilling;
