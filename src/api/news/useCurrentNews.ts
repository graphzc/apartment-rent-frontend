import News from "@/interface/News";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import newsQueryKeys from "./newsQueryKey";
import { getSession } from "next-auth/react";

const fetchCurrentNews = async () => {
    const { data } = await axios.get<News[]>("/news");

    return data;
};

const useCurrentNews = () => {
    return useQuery({
        queryKey: newsQueryKeys.all,
        queryFn: fetchCurrentNews,
    });
};

export default useCurrentNews;