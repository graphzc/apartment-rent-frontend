import Utility from "@/interface/Utility";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import utilityQueryKeys from "./utilityQueryKey";

const fetchUtilities = async () => {
    const { data } = await axios.get<Utility[]>("/utility");
    return data;
};

const useUtilities = () => {
    return useQuery({
        queryKey: utilityQueryKeys.all,
        queryFn: fetchUtilities,
    });
};

export default useUtilities;