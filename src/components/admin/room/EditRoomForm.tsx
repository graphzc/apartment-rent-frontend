'use client'

import { useForm } from "react-hook-form";
import SubmitButton from "@/components/SubmitButton";
import Room from "@/interface/Room";
import Apartment from "@/interface/Apartment";
import { useEffect } from "react";

interface EditRoomFormProps {
    room: Room;
    apartments: Apartment[];
    handleUpdate: (data: Room) => void;
}

export default function EditRoomForm( {room, apartments, handleUpdate}: EditRoomFormProps ) {
    const {register, handleSubmit, reset, formState} = useForm<Room>();
    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset])
    return (
        <div>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <input type="hidden" value={room.id} {...register('id')}/>
                <div className="mb-2.5 ext-lg">
                    <label htmlFor="name">เลขห้องพัก</label>
                    <input
                    type="text"
                    id="name"
                    className="input-primary"
                    required={true}
                    defaultValue={room.no}
                    {...register('no')}
                    />
                </div>
                <div className="mb-2.5 text-lg">
                    <label htmlFor="apartment">เลือกอพาร์ทเม้นท์</label>
                    <select
                        id="apartment"
                        className="input-primary"
                        defaultValue={room.apartmentId}
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
                    defaultValue={room.price}
                    {...register('price')}
                    />
                </div>
                <SubmitButton text="บันทึก"/>
            </form>
        </div>
    )
}