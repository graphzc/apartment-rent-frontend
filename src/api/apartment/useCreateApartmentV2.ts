import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import { CreateApartmentRequest, ApartmentActionResponse } from "@/interface/requests/ApartmentV2Request";
import Swal from "sweetalert2";

const useCreateApartmentV2 = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateApartmentRequest): Promise<ApartmentActionResponse> => {
            const session = await getSession();
            const response = await axios.post("/admin/apartments", data, {
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
                text: data.message || "เพิ่มอพาร์ตเมนต์สำเร็จ",
                icon: "success"
            });
        },
        onError: (error: any) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.message || "ไม่สามารถเพิ่มอพาร์ตเมนต์ได้",
                icon: "error"
            });
        }
    });
};

export default useCreateApartmentV2;
