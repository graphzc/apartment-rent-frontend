'use client'

import Apartment from "@/interface/Apartment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import  SubmitButton from '@/components/SubmitButton';
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
                <div className="mb-2.5 text-lg">
                    <label htmlFor="name">ชื่ออพาร์ทเม้นท์</label>
                    <div className="mb-2">
                      <input
                          type="text"
                          className="input-primary"
                          required={true}
                          {...register('name')}
                      />
                    </div>
                    <SubmitButton text="Submit"/>
                </div>
            </form>
        </div>
    )
}