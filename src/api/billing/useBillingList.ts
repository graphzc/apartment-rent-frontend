import Billing from "@/interface/Billing";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import billingQueryKeys from "./billingQueryKey";

const fetchBillingList = async (bookingId: string) => {
  const session = await getSession();
  const { data } = await axios.get<Billing[]>(`/bookings/${bookingId}/billings`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  return data;
};

const useBillingList = (bookingId: string) => {
  return useQuery<Billing[], Error>({
    queryKey: billingQueryKeys.list(bookingId),
    queryFn: () => fetchBillingList(bookingId),
  });
};

export default useBillingList;
