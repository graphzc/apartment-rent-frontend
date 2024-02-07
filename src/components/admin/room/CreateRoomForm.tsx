'use client'

import Room from "@/interface/Room"
import Apartment from "@/interface/Apartment"
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Session } from "next-auth";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton";
interface CreateRoomFormProps {
    apartments: Apartment[];
    handleCreate: (data: Room ) => void;
}

export default function CreateRoomForm ({ handleCreate,apartments }: CreateRoomFormProps ) {
    const {register, handleSubmit, reset, formState} = useForm<Room>();
    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset])

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate)}>
                <div className="mb-2.5 ext-lg">
                    <label htmlFor="name">เลขห้องพัก</label>
                    <input
                    type="text"
                    id="name"
                    className="input-primary"
                    required={true}
                    {...register('no')}
                    />
                </div>
                <div className="mb-2.5 text-lg">
                    <label htmlFor="apartment">เลือกอพาร์ทเม้นท์</label>
                    <select
                        id="apartment"
                        className="input-primary"
                        required={true}
                        {...register('apartmentId')}
                    >
                        {apartments?.map((apartment) =>( 
                            <option key={apartment.id}  value={apartment.id}> {apartment.name} </option>
                            ))}
                    </select>
                </div>
                <div className="mb-2.5 ext-lg">
                    <label htmlFor="name">ราคา</label>
                    <input
                    type="number"
                    id="price"
                    className="input-primary"
                    required={true}
                    {...register('price')}
                    />
                </div>
                <SubmitButton text="Submit"/>
            </form>
        </div>
    )
}