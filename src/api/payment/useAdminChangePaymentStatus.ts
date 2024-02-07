import { PaymentStatus } from "@/enum/PaymentStatus";
import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import paymentQueryKeys from "./paymentQueryKey";

const changeStatus = async ({ id, status }: { id: number, status: PaymentStatus }) => {
    const session = await getSession();

    const { data } = await axios.post<Payment>("/admin/payment/status", {
        id,
        status,
    }, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useUploadSlip = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changeStatus,
        onSuccess: ( data ) => {
            queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all });
        },
    });
}

export default useUploadSlip;
