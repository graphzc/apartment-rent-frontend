'use client'

import { toast } from "react-toastify";
import useApartments from '@/api/apartment/useApartments'
import CreateRoomForm from "@/components/admin/room/CreateRoomForm"
import  SubmitButton from '@/components/SubmitButton';
import Room from "@/interface/Room";
export default function CreateRoomPage() {
    const { isPending: isPendingCustomer, error: errorApartment, data: apartments } = useApartments();
    // const createMutation = useCreateCustomer();
    const handleCreate = (data: Room) => {
    // createMutation.mutate(data);
    toast.success("Create customer successfully");
 }

    return (
        <div>
             <h1 className="text-xl mb-5">สร้างห้องพัก</h1>
             <div className=" bg-gray-200 py-10 px-5 rounded-xl ">
                <CreateRoomForm  apartments={apartments!} handleCreate={handleCreate}/>
                <SubmitButton text="Submit"/>
             </div>
        </div>
    );
}