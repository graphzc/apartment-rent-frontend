import News from "@/interface/News";
import { thDateString, thDateTimeString } from "@/utils/thDateConvertor";

interface NewsCardProps {
    news: News;
}

export default function NewsCard({ news } : NewsCardProps) {
    return (
        <div className="mt-3 px-5 py-3 border border-gray-500 rounded-lg">
            <h1 className="font-bold text-lg">{news.title}</h1>
            <p>{news.content}</p>
            <p className="text-gray-600 text-sm">
                { 
                    thDateTimeString(news.createdAt)
                }
            </p>
        </div>
    )
}