import News from "@/interface/News";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import newsQueryKeys from "./newsQueryKey";
import { getSession } from "next-auth/react";

const fetchAllNews = async () => {
    const session = await getSession();
    const { data } = await axios.get<News[]>("/admin/news", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useAllNews = () => {
    return useQuery({
        queryKey: newsQueryKeys.all,
        queryFn: fetchAllNews,
    });
};

export default useAllNews;