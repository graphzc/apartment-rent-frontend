import Billing from "@/interface/Billing";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

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
    queryKey: ["billingDetail", billingId],
    queryFn: () => fetchBillingDetail(billingId),
  });
};

export default useBillingDetail;
