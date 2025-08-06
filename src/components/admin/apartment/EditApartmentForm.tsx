"use client";

import { useForm } from "react-hook-form";
import SubmitButton from "@/components/SubmitButton";
import Apartment from "@/interface/Apartment";
import { UpdateApartmentRequest } from "@/interface/requests/ApartmentRequest";
import { useEffect } from "react";

interface EditApartmentFormProps {
  apartment: Apartment;
  handleUpdate: (data: {
    id: string;
    apartment: UpdateApartmentRequest;
  }) => void;
}

export default function EditApartmentForm({
  apartment,
  handleUpdate,
}: EditApartmentFormProps) {
  const { register, handleSubmit, reset, formState } =
    useForm<UpdateApartmentRequest>();

  const onSubmit = (data: UpdateApartmentRequest) => {
    handleUpdate({ id: apartment.id, apartment: data });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2.5 text-lg">
          <label htmlFor="name">ชื่ออพาร์ทเม้นท์</label>
          <input
            type="text"
            id="name"
            className="input-primary"
            required={true}
            defaultValue={apartment.name}
            {...register("name")}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="description">รายละเอียด</label>
          <textarea
            id="description"
            className="input-primary"
            required={true}
            defaultValue={apartment.description}
            {...register("description")}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="plumbingPrice">ราคาน้ำต่อหน่วย</label>
          <input
            type="number"
            step="0.01"
            id="plumbingPrice"
            className="input-primary"
            required={true}
            defaultValue={apartment.plumbingPrice}
            {...register("plumbingPrice", { valueAsNumber: true })}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="electricityPrice">ราคาไฟต่อหน่วย</label>
          <input
            type="number"
            step="0.01"
            id="electricityPrice"
            className="input-primary"
            required={true}
            defaultValue={apartment.electricityPrice}
            {...register("electricityPrice", { valueAsNumber: true })}
          />
        </div>

        <div className="mt-4">
          <SubmitButton text="แก้ไข" />
        </div>
      </form>
    </div>
  );
}
