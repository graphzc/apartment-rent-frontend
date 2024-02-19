import News from "@/interface/News";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import newsQueryKeys from "./newsQueryKey";

const deleteNews = async (newsId: number) => {
    const session = await getSession();
    const { data } = await axios.delete<News>(`/admin/news/${newsId}`, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useCreateNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteNews,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: newsQueryKeys.all})
        }
    })

};

export default useCreateNews;