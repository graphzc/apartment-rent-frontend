import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { BookingV2 } from "@/interface/BookingV2";
import { bookingV2QueryKeys } from "./bookingV2QueryKey";

const useBookingsV2 = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: bookingV2QueryKeys.lists(),
    queryFn: async (): Promise<BookingV2[]> => {
      const response = await axiosConfig.get("/admin/bookings", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      return response.data;
    },
    enabled: !!session?.accessToken,
  });
};

export default useBookingsV2;
