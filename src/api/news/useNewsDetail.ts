import News from "@/interface/News";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import newsQueryKeys from "./newsQueryKey";

const fetchNewsDetail = async (id: string) => {
    const { data } = await axios.get<News>(`/news/${id}`);
    return data;
};

const useNewsDetail = (id: string) => {
    return useQuery({
        queryKey: newsQueryKeys.detail(id),
        queryFn: async () => fetchNewsDetail(id),
    });
};

export default useNewsDetail;
