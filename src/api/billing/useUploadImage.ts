import axios from "@/lib/axios.config";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

interface UploadImageResponse {
    url: string;
}

const uploadImage = async (file: File): Promise<UploadImageResponse> => {
    const session = await getSession();
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post<UploadImageResponse>("/upload", formData, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

const useUploadImage = () => {
    return useMutation({
        mutationFn: uploadImage,
    });
};

export default useUploadImage;
