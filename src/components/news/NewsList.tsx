'use client'

import useCurrentNews from "@/api/news/useCurrentNews";
import NewsCard from "./NewsCard";

export default function NewsList() {
    const { data: news, isPending, error } = useCurrentNews();
  
    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    return (
        <div>
            { news.map((news) => (
                <NewsCard key={news.id} news={news} />
            ))}
        </div>
    )
}