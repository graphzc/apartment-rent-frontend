import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosConfig from "@/lib/axios.config";
import { NewsV2 } from "@/interface/NewsV2";
import { newsV2QueryKeys } from "./newsV2QueryKey";

const useNewsItemV2 = (id: string) => {
    const { data: session } = useSession();

    return useQuery({
        queryKey: newsV2QueryKeys.detail(id),
        queryFn: async (): Promise<NewsV2> => {
            const response = await axiosConfig.get(`/admin/news/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            return response.data;
        },
        enabled: !!session?.accessToken && !!id,
    });
};

export default useNewsItemV2;
