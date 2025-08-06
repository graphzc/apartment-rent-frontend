import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

const fetchBillingList = async (bookingId: string) => {
  const { data } = await axios.get<Payment[]>(`/bookings/${bookingId}/billing`);
  return data;
};

const useBillingList = (bookingId: string) => {
  return useQuery<Payment[], Error>({
    queryKey: ["billingList", bookingId],
    queryFn: () => fetchBillingList(bookingId),
  });
};

export default useBillingList;
