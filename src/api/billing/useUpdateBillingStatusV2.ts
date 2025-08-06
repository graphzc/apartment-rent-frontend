import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { UpdateBillingStatusRequest } from '@/interface/BillingV2';
import { billingV2QueryKeys } from './billingV2QueryKeys';
import axios from '@/lib/axios.config';
import Swal from 'sweetalert2';

export const useUpdateBillingStatusV2 = () => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: UpdateBillingStatusRequest['status'] }) => {
            if (!session?.accessToken) {
                throw new Error('No access token available');
            }

            const response = await axios.put(
                `/admin/billings/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );

            return response.data;
        },
        onSuccess: (data, variables) => {
            // Invalidate and refetch billing queries
            queryClient.invalidateQueries({ queryKey: billingV2QueryKeys.all });

            Swal.fire({
                title: 'สำเร็จ!',
                text: 'อัปเดตสถานะบิลเรียบร้อยแล้ว',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: (error: any) => {
            console.error('Error updating billing status:', error);

            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: error.response?.data?.message || 'ไม่สามารถอัปเดตสถานะบิลได้',
                icon: 'error',
            });
        },
    });
};
