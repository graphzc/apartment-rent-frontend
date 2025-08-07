import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { billingV2QueryKeys } from './billingV2QueryKeys';
import axios from '@/lib/axios.config';
import Swal from 'sweetalert2';

export const useGenerateMonthlyRentV2 = () => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            if (!session?.accessToken) {
                throw new Error('No access token available');
            }

            const response = await axios.post(
                `/admin/billings/generate-monthly-rent`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );

            return response.data;
        },
        onSuccess: (data) => {
            // Invalidate and refetch billing queries
            queryClient.invalidateQueries({ queryKey: billingV2QueryKeys.all });

            Swal.fire({
                title: 'สำเร็จ!',
                text: 'สร้างบิลค่าเช่ารายเดือนเรียบร้อยแล้ว',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: (error: any) => {
            console.error('Error generating monthly rent billings:', error);

            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: error.response?.data?.message || 'ไม่สามารถสร้างบิลค่าเช่ารายเดือนได้',
                icon: 'error',
            });
        },
    });
};
