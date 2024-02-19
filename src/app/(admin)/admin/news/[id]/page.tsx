'use client'

import useNews from "@/api/news/useNews";
import BackButton from "@/components/BackButton";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { thDateString, thDateTimeString } from "@/utils/thDateConvertor";

export default function ViewNews({params} : {params: {id: string}}) {

    const { data: news, isPending, error } = useNews(parseInt(params.id));

    if (isPending) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <BackButton href="/admin/news" />
            <DashboardHeader text="ดูข่าวสาร" />
            <div>
                <div>
                    <span className="font-medium">หัวข้อ</span> : {news.title}
                </div>
                <div>
                    <span className="font-medium">เนื้อหา</span> : {news.content}
                </div>
                <div>
                    <span className="font-medium">วันที่สร้าง</span> : { thDateTimeString(news.createdAt) }
                </div> 
                <div>
                    <span className="font-medium">วันที่สิ้นสุด</span> : { thDateString(news.endDate) }
                </div>
                <div>
                    <span className="font-medium">สถานะ</span> :  
                    {new Date(news.endDate!) > new Date() 
                    ? <span className="text-green-500"> ไม่หมดอายุ</span> 
                    : <span className="text-red-500"> หมดอายุ</span>}
                </div>
            </div>
        </div>
    );
}