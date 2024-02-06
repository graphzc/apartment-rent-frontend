'use client'

import { toast } from "react-toastify";
import CreateApartmentForm from '@/components/admin/apartment/CreateApartmentForm';
import  SubmitButton from '@/components/SubmitButton';
import Apartment from "@/interface/Apartment";
export default function CreateApartmentPage() {
    // const createMutation = useCreateCustomer();
    const handleCreate = (data: Apartment) => {
    // createMutation.mutate(data);
    toast.success("Create customer successfully");
 }

    return (
        <div>
             <h1 className="text-xl mb-5">สร้างอพาร์ทเม้นท์</h1>
             <div className=" bg-gray-200 py-10 px-5 rounded-xl ">
                <CreateApartmentForm handleCreate={handleCreate}/>
                <SubmitButton text="Submit"/>
             </div>
        </div>
    );
}