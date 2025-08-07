"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NewsForm from "@/components/admin/v2/NewsForm";
import BackButton from "@/components/BackButton";
import { UpdateNewsRequest } from "@/interface/requests/NewsV2Request";
import useNewsItemV2 from "@/api/news/useNewsItemV2";
import useUpdateNewsV2 from "@/api/news/useUpdateNewsV2";
import Swal from "sweetalert2";

interface NewsEditV2Props {
  id: string;
}

const NewsEditV2 = ({ id }: NewsEditV2Props) => {
  const router = useRouter();
  const { data: news, isLoading: isLoadingNews, error } = useNewsItemV2(id);
  const updateNews = useUpdateNewsV2();

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถโหลดข้อมูลข่าวสารได้",
        icon: "error",
        confirmButtonText: "กลับไปหน้ารายการ",
      }).then(() => {
        router.push("/adminv2/news");
      });
    }
  }, [error, router]);

  const handleSubmit = async (data: UpdateNewsRequest) => {
    try {
      await updateNews.mutateAsync({ id, data });

      Swal.fire({
        title: "สำเร็จ!",
        text: "แก้ไขข่าวสารเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.push("/adminv2/news");
      });
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถแก้ไขข่าวสารได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  if (isLoadingNews) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">
              กำลังโหลดข้อมูลข่าวสาร...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            แก้ไขข่าวสาร - {news.title}
          </h2>
          <BackButton href="/adminv2/news" />
        </div>
      </div>

      <div className="p-6">
        <NewsForm
          mode="edit"
          news={news}
          onSubmit={handleSubmit}
          isLoading={updateNews.isPending}
        />
      </div>
    </div>
  );
};

export default NewsEditV2;
