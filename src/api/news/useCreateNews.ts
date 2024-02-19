import News from "@/interface/News";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const createNews = async (news: News) => {
    const session = await getSession();
    const { data } = await axios.post<News>("/admin/news", news, {
        headers:{
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useCreateNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createNews,
    })

};

export default useCreateNews;