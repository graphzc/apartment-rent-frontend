import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const uploadSlip = async (slipData: FormData) => {
    const session = await getSession();

    const { data } = await axios.post<Payment>("/payment/slip", slipData, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": `multipart/form-data`,
        }
    });
    return data;
};

const useUploadSlip = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadSlip,
        
    });
}

export default useUploadSlip;
