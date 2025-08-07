"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackButton from "@/components/BackButton";
import useNewsItemV2 from "@/api/news/useNewsItemV2";
import Swal from "sweetalert2";

interface NewsViewV2Props {
  id: string;
}

const NewsViewV2 = ({ id }: NewsViewV2Props) => {
  const router = useRouter();
  const { data: news, isLoading, error } = useNewsItemV2(id);

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
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
            รายละเอียดข่าวสาร
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push(`/adminv2/news/edit/${news.id}`)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              แก้ไข
            </button>
            <BackButton href="/adminv2/news" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {news.title}
            </h3>
          </div>

          {/* Timestamps */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 border-b pb-4">
            <div>
              <span className="font-medium">สร้างเมื่อ:</span>{" "}
              {formatDate(news.createdAt)}
            </div>
            <div>
              <span className="font-medium">แก้ไขล่าสุด:</span>{" "}
              {formatDate(news.updatedAt)}
            </div>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              เนื้อหา
            </h4>
            <div className="prose max-w-none">
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {news.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsViewV2;
