'use client'

import Room from "@/interface/Room"
import Apartment from "@/interface/Apartment"
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Session } from "next-auth";
import { useState } from "react";
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
                <div className="mb-2.5 px-3 text-lg">
                    <label htmlFor="name">ชื่อห้องพัก</label>
                    <input
                    type="text"
                    id="name"
                    className="input-primary"
                    required={true}
                    // {...register('name')}

                    />
                </div>
                <div className="mb-2.5 px-3 text-lg">
                    <label htmlFor="apartment">เลือกอพาร์ทเม้นท์</label>
                    <select
                        id="apartment"
                        className="input-primary"
                        required={true}
                    >
                        <option hidden></option>
                        {apartments?.map((apartment) =>( 
                            <option id={apartment.id} value={apartment.id}> {apartment.name} </option>
                            ))}
                    </select>
                </div>

            </form>
        </div>
    )
}