'use client'

import { useForm } from "react-hook-form";
import SubmitButton from "@/components/SubmitButton";
import Room from "@/interface/Room";
import Apartment from "@/interface/Apartment";

interface EditRoomFormProps {
    // data: Room;
    apartments: Apartment[];
//     handleUpdate: (data: Room) => void;
}

export default function EditRoomForm( {apartments}: EditRoomFormProps ) {

    return (
        <div>
            <form >
                <div className="mb-2.5 px-3 text-lg">
                    <label htmlFor="id">ID</label>
                    <input
                    type="text"
                    id="id"
                    className="input-primary"
                    required={true}
                    readOnly
                    />
                </div>
                <div className="mb-2.5 px-3 text-lg">
                    <label htmlFor="name">ชื่อห้อง</label>
                    <input
                    type="text"
                    id="name"
                    className="input-primary"
                    required={true}

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
                <div className="mt-4">
                    <SubmitButton text="แก้ไข"/>
                </div>
            </form>
        </div>
    )
}