'use client'

import { useForm } from "react-hook-form";
import SubmitButton from "@/components/SubmitButton";
import Apartment from "@/interface/Apartment";

interface EditApartmentFormProps {
    data: Apartment;
    handleUpdate: (data: Apartment) => void;
}

export default function EditApartmentForm() {

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
                    <label htmlFor="name">ชื่ออพาร์ทเม้นท์</label>
                    <input
                    type="text"
                    id="name"
                    className="input-primary"
                    required={true}

                    />
                </div>
                <div className="mb-2.5 px-3 text-lg">
                    <label htmlFor="rooms">จำนวนห้อง</label>
                    <input
                    type="text"
                    id="rooms"
                    className="input-primary"
                    required={true}

                    />
                </div>
                
                <div className="mt-4">
                    <SubmitButton text="แก้ไข"/>
                </div>
            </form>
        </div>
    )
}