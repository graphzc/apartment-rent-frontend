"use client";
import useNewsDetail from "@/api/news/useNewsDetail";
import { thDateTimeString } from "@/utils/thDateConvertor";
import { useParams } from "next/navigation";

export default function NewsDetail() {
  // get id from params
  const { id } = useParams<{ id: string }>();

  const { data: news, isPending, error } = useNewsDetail(id);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!news) {
    return <div>No news found</div>;
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
        <div className="w-100 relative my-16">
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
          <p className="text-gray-600 text-sm mb-6">
            {thDateTimeString(news.createdAt)}
          </p>
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed">{news.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
