'use client'

import Apartment from "@/interface/Apartment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
interface CreateApartmentFormProps {
    handleCreate: (data: Apartment) => void;
}

export default function CreateApartmentForm ({ handleCreate }: CreateApartmentFormProps ) {
    const {register, handleSubmit, reset, formState} = useForm<Apartment>();
    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset])

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate)}>
                <div className="mb-2.5 px-3 text-lg">
                    <label htmlFor="name">ชื่ออพาร์ทเม้นท์</label>
                    <input
                    type="text"
                    id="name"
                    className="input-primary"
                    required={true}
                    {...register('name')}

                    />
                </div>
                <div className="mb-2.5 px-3 text-lg">
                    <label htmlFor="rooms">จำนวนห้อง</label>
                    <input
                    type="text"
                    id="rooms"
                    className="input-primary"
                    required={true}
                    {...register('name')}

                    />
                </div>

            </form>
        </div>
    )
}