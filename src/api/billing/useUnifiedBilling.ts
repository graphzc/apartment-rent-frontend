import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { billingV2QueryKeys } from './billingV2QueryKeys';
import billingQueryKeys from './billingQueryKey';
import axios from '@/lib/axios.config';
import { BillingV2 } from '@/interface/BillingV2';
import Billing from '@/interface/Billing';

// Unified billing interface for the receipt
export interface UnifiedBilling {
    id: string;
    bookingId: string;
    billingReference: string;
    paymentHistory: {
        id: string;
        slipImage: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    }[];
    userName: string;
    no: number;
    type: string;
    amount: number;
    status: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

// Convert Billing to UnifiedBilling
const normalizeBilling = (billing: Billing): UnifiedBilling => ({
    ...billing,
    dueDate: billing.dueDate instanceof Date ? billing.dueDate.toISOString() : billing.dueDate,
    createdAt: billing.createdAt instanceof Date ? billing.createdAt.toISOString() : billing.createdAt,
    updatedAt: billing.updatedAt instanceof Date ? billing.updatedAt.toISOString() : billing.updatedAt,
    paymentHistory: billing.paymentHistory.map(payment => ({
        ...payment,
        createdAt: payment.createdAt instanceof Date ? payment.createdAt.toISOString() : payment.createdAt,
        updatedAt: payment.updatedAt instanceof Date ? payment.updatedAt.toISOString() : payment.updatedAt,
    }))
});

// Convert BillingV2 to UnifiedBilling
const normalizeBillingV2 = (billing: BillingV2): UnifiedBilling => ({
    ...billing,
    paymentHistory: billing.paymentHistory
});

export const useUnifiedBilling = (id: string) => {
    const { data: session } = useSession();

    return useQuery({
        queryKey: ['unifiedBilling', id],
        queryFn: async (): Promise<UnifiedBilling> => {
            if (!session?.accessToken) {
                throw new Error('No access token available');
            }

            // Try admin endpoint first (for admin users)
            try {
                const adminResponse = await axios.get(
                    `/admin/billings/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    }
                );
                return normalizeBillingV2(adminResponse.data);
            } catch (adminError) {
                // If admin endpoint fails, try user endpoint
                try {
                    const userResponse = await axios.get(
                        `/billings/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${session.accessToken}`,
                            },
                        }
                    );
                    return normalizeBilling(userResponse.data);
                } catch (userError) {
                    throw new Error('Failed to fetch billing data from both admin and user endpoints');
                }
            }
        },
        enabled: !!session?.accessToken && !!id,
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
