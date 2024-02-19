import News from "@/interface/News";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import newsQueryKeys from "./newsQueryKey";
import { getSession } from "next-auth/react";

const fetchNews = async (id: number) => {
    const session = await getSession();
    const { data } = await axios.get<News>(`/admin/news/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useNews = (id: number) => {
    return useQuery({
        queryKey: newsQueryKeys.detail(id),
        queryFn: async () => fetchNews(id),
    });
};

export default useNews;