'use client'

import { toast } from "react-toastify";
import  EditRoomForm from '@/components/admin/room/EditRoomForm';
import  SubmitButton from '@/components/SubmitButton';
import Apartment from "@/interface/Apartment";
import useApartments from "@/api/apartment/useApartments";
export default function CreateCustomerPage({params} : {params: {id: string}}) {
    const { isPending: isPendingApartment, error: errorApartment, data: apartments } = useApartments();
    // if(isPending) return <div>Loading...</div>;
    // if(error) return <div>{error.message}</div>;
    const handleUpdate = (data: Apartment) => {
        // editCustomer.mutate(data);
    }

    return (

        <div>
             <h1 className="text-xl mb-5">แก้ไขห้องพัก</h1>
             <div className=" bg-gray-200 py-10 px-5 rounded-xl ">
                {/* <EditRoomForm apartments={apartments!} /> */}
             </div>
        </div>
    );
}