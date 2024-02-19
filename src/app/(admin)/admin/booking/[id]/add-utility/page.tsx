'use client'

import useCreateUtility from "@/api/utility/useCreateUtility";
import BackButton from "@/components/BackButton";
import DashboardHeader from "@/components/admin/DashboardHeader";
import UtilityForm from "@/components/admin/utility/AddUtilityForm";
import Utility from "@/interface/Utility";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddUtility({params} : {params: {id: string}}) {
    const createUtility = useCreateUtility();
    const router = useRouter();

    const handleCreate = async (utility: Utility) => {
        const created = await createUtility.mutateAsync(utility);
        toast.success("เพิ่มค่าน้ำค่าไฟสำเร็จ");
        router.push(`/admin/booking/${params.id}`);
    }

    return (
        <div>
            <BackButton href={ `/admin/booking/${params.id}` } />
            <DashboardHeader text="เพิ่มค่าน้ำค่าไฟ" />
            <UtilityForm bookingId={parseInt(params.id)} handleCreate={handleCreate} />
        </div>
    )    
}