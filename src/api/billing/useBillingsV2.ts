import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { billingV2QueryKeys } from './billingV2QueryKeys';
import axios from '@/lib/axios.config';
import { BillingV2 } from '@/interface/BillingV2';

interface UseBillingsV2Params {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
}

export const useBillingsV2 = (params: UseBillingsV2Params = {}) => {
    const { data: session } = useSession();

    return useQuery({
        queryKey: billingV2QueryKeys.list(params),
        queryFn: async (): Promise<Array<BillingV2>> => {
            if (!session?.accessToken) {
                throw new Error('No access token available');
            }

            const response = await axios.get(
                "/admin/billings",
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );

            return response.data;
        },
        enabled: !!session?.accessToken,
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
