import Billing from "@/interface/Billing";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import billingQueryKeys from "./billingQueryKey";

const fetchBillingDetail = async (billingId: string) => {
  const session = await getSession();
  const { data } = await axios.get<Billing>(`/billings/${billingId}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  return data;
};

const useBillingDetail = (billingId: string) => {
  return useQuery<Billing, Error>({
    queryKey: billingQueryKeys.detail(billingId),
    queryFn: () => fetchBillingDetail(billingId),
  });
};

export default useBillingDetail;
