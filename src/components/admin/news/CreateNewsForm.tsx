'use client'

import SubmitButton from "@/components/SubmitButton";
import News from "@/interface/News";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateApartmentFormProps {
    handleCreate: (data: News) => void;
}

export default function CreateNewsForm ({ handleCreate }: CreateApartmentFormProps ) {
    const {register, handleSubmit, reset, formState} = useForm<News>();
    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset])

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate)}>
                <div className="mb-2.5 text-lg">
                    <label htmlFor="title">หัวข้อ</label>
                    <div className="mb-2">
                      <input
                          type="text"
                          className="input-primary"
                          required={true}
                          {...register('title')}
                      />
                    </div>
                    <label htmlFor="description">เนื้อหา</label>
                    <div className="mb-2">
                      <textarea
                          className="input-primary"
                          required={true}
                          {...register('content')}
                      />
                    </div>

                    <label htmlFor="endDate">วันสิ้นสุด</label>
                    <div className="mb-2">
                      <input
                          type="date"
                          className="input-primary"
                          required={true}
                          {...register('endDate')}
                      />
                    </div>
                    <div className="mt-2">
                        <SubmitButton text="Submit"/>
                    </div>
                </div>
            </form>
        </div>
    )
}