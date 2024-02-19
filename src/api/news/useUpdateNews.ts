import Payment from "@/interface/Payment";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import newsQueryKeys from "./newsQueryKey";
import News from "@/interface/News";

const updateNews = async (news: News) => {
    const session = await getSession();

    const { data } = await axios.put<News>(`/admin/news/${news.id}`, news, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useUpdateNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateNews,
        onSuccess: ( data ) => {
            queryClient.invalidateQueries({ queryKey: newsQueryKeys.all });
        },
    });
}

export default useUpdateNews;
