'use client'

import { toast } from "react-toastify";
import CreateApartmentForm from '@/components/admin/apartment/CreateApartmentForm';
import Apartment from "@/interface/Apartment";
import useCreateApartment from "@/api/apartment/useCreateApartment";
import BackButton from "@/components/BackButton";
export default function CreateApartmentPage() {
    const createMutation = useCreateApartment();

    const handleCreate = async (data: Apartment) => {
        console.log(data)
        await createMutation.mutateAsync(data);
        toast.success("Create customer successfully");
    }

    return (
        <div>
            <BackButton href="/admin/apartment" />
             <h1 className="text-xl mb-5">สร้างอพาร์ทเม้นท์</h1>
             <div>
                <CreateApartmentForm handleCreate={handleCreate}/>
             </div>
        </div>
    );
}