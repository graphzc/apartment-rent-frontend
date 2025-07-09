"use client";
import useCurrentNews from "@/api/news/useCurrentNews";
import News from "@/interface/News";
import { thDateTimeString } from "@/utils/thDateConvertor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewsDetail() {
  // get id from params
  const { id } = useParams<{ id: string }>();

  const [filteredNews, setFilteredNews] = useState<News | null>(null);
  const { data: news, isPending, error } = useCurrentNews();

  useEffect(() => {
    // Reset filtered news when the component mounts or id changes
    setFilteredNews(null);

    if (news) {
      // Filter the news by the current ID
      const currentNews = news.find((item) => item.id === Number(id));
      setFilteredNews(currentNews || null);
    }
  }, [id, news]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="w-100 relative text-center">
        <img
          src="/homeAsset/promotion.jpg"
          className="object-cover h-96 w-screen"
        />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">ข่าวสาร</div>
        </div>
      </div>
      <div className="container mx-auto mb-44 sm:px-3">
        {filteredNews ? (
          <div className="w-100 relative my-16">
            <h1>{filteredNews.title}</h1>
            <p>{filteredNews.content}</p>
            <p className="text-gray-600 text-sm">ถึง {thDateTimeString(filteredNews.createdAt)}</p>

          </div>
        ) : (
          <div>No news found</div>
        )}
      </div>
    </>
  );
}
