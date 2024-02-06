'use client'

import { toast } from "react-toastify";
import  EditApartmentForm from '@/components/admin/apartment/EditApartmentForm';
import  SubmitButton from '@/components/SubmitButton';
import Apartment from "@/interface/Apartment";
export default function CreateCustomerPage({params} : {params: {id: string}}) {
    // const {isPending, error, data} = useOneCustomer(params.id);
    // const editCustomer = useEditApartment();

    // if(isPending) return <div>Loading...</div>;

    // if(error) return <div>{error.message}</div>;
    const handleUpdate = (data: Apartment) => {
        // editCustomer.mutate(data);
    }

    return (

        <div>
             <h1 className="text-xl mb-5">แก้ไขอพาร์ทเม้นท์</h1>
             <div className=" bg-gray-200 py-10 px-5 rounded-xl ">
                <EditApartmentForm 
                ></EditApartmentForm>

             </div>
        </div>
    );
}