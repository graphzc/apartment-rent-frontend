import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

const fetchBillingDetail = async (billingId: number) => {
  const { data } = await axios.get<Payment>(`/billing/${billingId}`);
  return data;
};

const useBillingDetail = (billingId: number) => {
  return useQuery<Payment, Error>({
    queryKey: ["billingDetail", billingId],
    queryFn: () => fetchBillingDetail(billingId),
  });
};

export default useBillingDetail;
