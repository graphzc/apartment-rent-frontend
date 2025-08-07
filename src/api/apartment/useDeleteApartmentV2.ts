import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { ApartmentActionResponse } from "@/interface/requests/ApartmentV2Request";
import Swal from "sweetalert2";
import { getSession } from "next-auth/react";

const useDeleteApartmentV2 = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<ApartmentActionResponse> => {
            const session = await getSession();
            const response = await axios.delete(`/admin/apartments/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });

            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["apartments"] });
            Swal.fire({
                title: "สำเร็จ!",
                text: data.message || "ลบอพาร์ตเมนต์สำเร็จ",
                icon: "success"
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถลบอพาร์ตเมนต์ได้",
                icon: "error"
            });
        }
    });
};

export default useDeleteApartmentV2;
