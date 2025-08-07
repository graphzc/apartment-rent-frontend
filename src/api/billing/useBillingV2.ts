import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { billingV2QueryKeys } from './billingV2QueryKeys';
import axios from '@/lib/axios.config';
import { BillingV2 } from '@/interface/BillingV2';

export const useBillingV2 = (id: string) => {
    const { data: session } = useSession();

    return useQuery({
        queryKey: billingV2QueryKeys.detail(id),
        queryFn: async (): Promise<BillingV2> => {
            if (!session?.accessToken) {
                throw new Error('No access token available');
            }

            const response = await axios.get(
                `/admin/billings/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );

            return response.data;
        },
        enabled: !!session?.accessToken && !!id,
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
