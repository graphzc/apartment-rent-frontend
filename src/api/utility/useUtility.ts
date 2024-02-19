import Utility from "@/interface/Utility";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import utilityQueryKeys from "./utilityQueryKey";

const fetchUtility = async (id: number) => {
    const { data } = await axios.get<Utility>(`/utility/${id}`);
    return data;
};

const useUtility = (id: number) => {
    return useQuery({
        queryKey: utilityQueryKeys.detail(id),
        queryFn: async () => fetchUtility(id),
    });
};

export default useUtility;