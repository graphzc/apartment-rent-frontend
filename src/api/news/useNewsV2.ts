import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { NewsV2 } from "@/interface/NewsV2";
import { newsV2QueryKeys } from "./newsV2QueryKey";

const useNewsV2 = () => {
    const { data: session } = useSession();

    return useQuery({
        queryKey: newsV2QueryKeys.lists(),
        queryFn: async (): Promise<NewsV2[]> => {
            const response = await axiosConfig.get("/admin/news", {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            return response.data;
        },
        enabled: !!session?.accessToken,
    });
};

export default useNewsV2;
