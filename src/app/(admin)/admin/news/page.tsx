'use client'

import useAllNews from "@/api/news/useAllNews";
import useNews from "@/api/news/useNews";
import DashboardHeader from "@/components/admin/DashboardHeader"
import NewsDataTable from "@/components/admin/news/NewsDataTable"
import Link from "next/link"

export default function NewsAdmin() {
    const { data: news, error, isPending } = useAllNews();

    if (isPending) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <DashboardHeader text="จัดการข่าวสาร" />
            <div className="flex justify-end">
                <Link href="/admin/news/create" className="bg-blue-500 text-white px-3 py-2 rounded-lg mb-2">สร้างข่าว</Link>
            </div>
            <NewsDataTable data={news} />
        </div>
    )
}