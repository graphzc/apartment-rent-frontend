"use client";

import useNewsV2 from "@/api/news/useNewsV2";
import NewsDataTableV2 from "@/components/admin/v2/NewsDataTableV2";

const NewsListV2 = () => {
  const { data: news = [], isLoading, error } = useNewsV2();

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">เกิดข้อผิดพลาด</p>
          <p className="text-sm mt-2">
            ไม่สามารถโหลดข้อมูลข่าวสารได้ กรุณาลองใหม่อีกครั้ง
          </p>
        </div>
      </div>
    );
  }

  return <NewsDataTableV2 data={news} isLoading={isLoading} />;
};

export default NewsListV2;
