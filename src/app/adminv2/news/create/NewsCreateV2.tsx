"use client";

import { useRouter } from "next/navigation";
import NewsForm from "@/components/admin/v2/NewsForm";
import BackButton from "@/components/BackButton";
import { CreateNewsRequest } from "@/interface/requests/NewsV2Request";
import useCreateNewsV2 from "@/api/news/useCreateNewsV2";
import Swal from "sweetalert2";

const NewsCreateV2 = () => {
  const router = useRouter();
  const createNews = useCreateNewsV2();

  const handleSubmit = async (data: CreateNewsRequest) => {
    try {
      await createNews.mutateAsync(data);

      Swal.fire({
        title: "สำเร็จ!",
        text: "เพิ่มข่าวสารเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.push("/adminv2/news");
      });
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถเพิ่มข่าวสารได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">เพิ่มข่าวสาร</h2>
          <BackButton href="/adminv2/news" />
        </div>
      </div>

      <div className="p-6">
        <NewsForm
          mode="create"
          onSubmit={handleSubmit}
          isLoading={createNews.isPending}
        />
      </div>
    </div>
  );
};

export default NewsCreateV2;
