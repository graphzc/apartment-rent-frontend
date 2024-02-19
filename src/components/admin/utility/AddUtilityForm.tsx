'use client'

import SubmitButton from "@/components/SubmitButton";
import Utility from "@/interface/Utility";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UtilityFormProps {
    bookingId: number;
    handleCreate: (utility: Utility) => void;
}

export default function UtilityForm({ bookingId, handleCreate }: UtilityFormProps) {
    const { register, handleSubmit, reset, formState } = useForm<Utility>();
    
    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset]);

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate)}>
                <input
                    type="hidden"
                    {...register('bookingId')}
                    value={bookingId}
                />
                {/* forMonth */}
                <div className="mb-2.5 text-lg">
                    <label htmlFor="forMonth">วันที่จด</label>
                    <input
                        type="date"
                        id="forMonth"
                        className="input-primary"
                        required={true}
                        {...register('forMonth')}
                    />
                </div>
                {/* electric */}
                <div className="mb-2.5 text-lg">
                    <label htmlFor="electric">หน่วยไฟฟ้า</label>
                    <input
                        type="number"
                        id="electric"
                        className="input-primary"
                        required={true}
                        {...register('electricity')}
                    />
                </div>
                {/* plumbing */}
                <div className="mb-2.5 text-lg">
                    <label htmlFor="plumbing">หน่วยประปา</label>
                    <input
                        type="number"
                        id="plumbing"
                        className="input-primary"
                        required={true}
                        {...register('plumbing')}
                    />
                </div>
                <SubmitButton text="เพิ่มข้อมูล" />
            </form>
        </div>
    )
};