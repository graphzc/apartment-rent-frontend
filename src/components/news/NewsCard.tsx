import News from "@/interface/News";
import { thDateString, thDateTimeString } from "@/utils/thDateConvertor";
import { useRouter } from "next/navigation";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const router = useRouter();
  return (
    <div
      className="mt-3 px-5 py-3 border border-gray-500 rounded-lg hover:cursor-pointer hover:bg-gray-100"
      onClick={() => router.push(`/news/${news.id}`)}
    >
      <h1 className="font-bold text-lg">{news.title}</h1>
      {/* <p>{news.content}</p> */}
      <p className="text-gray-600 text-sm">
        {thDateTimeString(news.createdAt)}
      </p>
    </div>
  );
}
