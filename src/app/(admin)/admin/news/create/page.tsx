'use client'

import { toast } from "react-toastify";
import CreateNewsForm from '@/components/admin/news/CreateNewsForm';
import News from "@/interface/News";
import useCreateNews from "@/api/news/useCreateNews";
import BackButton from "@/components/BackButton";
export default function CreateNewsPage() {
    const createMutation = useCreateNews();

    const handleCreate = async (data: News) => {
        await createMutation.mutateAsync(data);
        toast.success("สร้างข่าวสำเร็จ");
    }

    return (
        <div>
            <BackButton href="/admin/news" />
             <h1 className="text-xl mb-5">สร้างอพาร์ทเม้นท์</h1>
             <div>
                <CreateNewsForm handleCreate={handleCreate}/>
             </div>
        </div>
    );
}