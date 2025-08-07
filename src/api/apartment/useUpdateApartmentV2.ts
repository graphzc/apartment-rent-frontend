import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { UpdateApartmentRequest, ApartmentActionResponse } from "@/interface/requests/ApartmentV2Request";
import Swal from "sweetalert2";

const useUpdateApartmentV2 = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateApartmentRequest }): Promise<ApartmentActionResponse> => {
            const session = await getSession();
            const response = await axios.put(`/admin/apartments/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                }
            });
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["apartments"] });
            Swal.fire({
                title: "สำเร็จ!",
                text: data.message || "อัปเดตอพาร์ตเมนต์สำเร็จ",
                icon: "success"
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถอัปเดตอพาร์ตเมนต์ได้",
                icon: "error"
            });
        }
    });
};

export default useUpdateApartmentV2;
