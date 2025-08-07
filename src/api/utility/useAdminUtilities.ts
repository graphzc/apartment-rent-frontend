import Utility from "@/interface/Utility";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import utilityAdminQueryKeys from "./utilityAdminQueryKey";

const fetchAdminUtilities = async () => {
    const session = await getSession();
    const { data } = await axios.get<Utility[]>("/admin/utilities", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useAdminUtilities = () => {
    return useQuery({
        queryKey: utilityAdminQueryKeys.all,
        queryFn: fetchAdminUtilities,
    });
};

export default useAdminUtilities;
