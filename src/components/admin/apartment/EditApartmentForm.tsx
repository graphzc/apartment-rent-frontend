'use client'

import { useForm } from "react-hook-form";
import SubmitButton from "@/components/SubmitButton";
import Apartment from "@/interface/Apartment";
import { useEffect } from "react";

interface EditApartmentFormProps {
    apartment: Apartment;
    handleUpdate: (data: Apartment) => void;
}

export default function EditApartmentForm({ apartment, handleUpdate }: EditApartmentFormProps) {
    const {register, handleSubmit, reset, formState} = useForm<Apartment>();
    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset])
    return (
        <div>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <input type="hidden" value={apartment.id} {...register('id')} />
                <div className="mb-2.5 text-lg">
                    <label htmlFor="name">ชื่ออพาร์ทเม้นท์</label>
                    <input
                        type="text"
                        id="name"
                        className="input-primary"
                        required={true}
                        defaultValue={apartment.name}
                        {...register('name')}
                    />
                </div>
                <div className="mt-4">
                    <SubmitButton text="แก้ไข"/>
                </div>
            </form>
        </div>
    )
}