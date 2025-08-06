"use client";

import { CreateApartmentRequest } from "@/interface/requests/ApartmentRequest";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/SubmitButton";

interface CreateApartmentFormProps {
  handleCreate: (data: CreateApartmentRequest) => void;
}

export default function CreateApartmentForm({
  handleCreate,
}: CreateApartmentFormProps) {
  const { register, handleSubmit, reset, formState } =
    useForm<CreateApartmentRequest>();
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

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
              {...register("name")}
            />
          </div>

          <label htmlFor="description">รายละเอียด</label>
          <div className="mb-2">
            <textarea
              className="input-primary"
              required={true}
              {...register("description")}
            />
          </div>

          <label htmlFor="plumbingPrice">ราคาน้ำต่อหน่วย</label>
          <div className="mb-2">
            <input
              type="number"
              step="0.01"
              className="input-primary"
              required={true}
              {...register("plumbingPrice", { valueAsNumber: true })}
            />
          </div>

          <label htmlFor="electricityPrice">ราคาไฟต่อหน่วย</label>
          <div className="mb-2">
            <input
              type="number"
              step="0.01"
              className="input-primary"
              required={true}
              {...register("electricityPrice", { valueAsNumber: true })}
            />
          </div>

          <SubmitButton text="Submit" />
        </div>
      </form>
    </div>
  );
}
