'use client'

import useNews from "@/api/news/useNews";
import useUpdateNews from "@/api/news/useUpdateNews";
import BackButton from "@/components/BackButton";
import DashboardHeader from "@/components/admin/DashboardHeader";
import EditNewsForm from "@/components/admin/news/EditNewsForm";
import News from "@/interface/News";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditNews({params} : {params: {id: string}}) {

    const { data: news, isPending, error } = useNews(parseInt(params.id));
    const editMutation = useUpdateNews();
    const router = useRouter();
    if (isPending) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    const handleEdit = async (news: News) => {
        const edited = await editMutation.mutateAsync(news);
        if (edited) {
            toast.success("แก้ไขข่าวสารสำเร็จ");
            router.push("/admin/news");
        }
    }

    return (
        <div>
            <BackButton href="/admin/news" />
            <DashboardHeader text="แก้ไขข่าวสาร" />
            <EditNewsForm news={news} handleEdit={handleEdit} />
        </div>
    )
}