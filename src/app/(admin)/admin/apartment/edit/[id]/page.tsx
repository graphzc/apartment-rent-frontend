'use client'

import { toast } from "react-toastify";
import  EditApartmentForm from '@/components/admin/apartment/EditApartmentForm';
import  SubmitButton from '@/components/SubmitButton';
import Apartment from "@/interface/Apartment";
import useApartment from "@/api/apartment/useApartment";
import useUpdateApartment from "@/api/apartment/useUpdateApartment";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
export default function CreateCustomerPage({params} : {params: {id: string}}) {
    const router = useRouter();
    const {isPending, error, data: apartment} = useApartment(parseInt(params.id));
    const updateApartment = useUpdateApartment();

    if (isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    const handleUpdate = async (data: Apartment) => {
        const updated = await updateApartment.mutateAsync(data);

        if (updated) {
            toast.success('อพาร์ทเม้นท์ถูกแก้ไขแล้ว');  
            router.push('/admin/apartment');  
        }
    }

    return (

        <div>
            <BackButton href="/admin/apartment" />
            <h1 className="text-xl mb-5">แก้ไขอพาร์ทเม้นท์</h1>
            <EditApartmentForm apartment={apartment} handleUpdate={handleUpdate} />
        </div>
    );
}