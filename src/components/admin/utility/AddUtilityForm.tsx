"use client";

import SubmitButton from "@/components/SubmitButton";
import { CreateUtilityRequest } from "@/interface/requests/UtilityRequest";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UtilityFormProps {
  bookingId: string;
  handleCreate: (utility: CreateUtilityRequest) => void;
}

export default function UtilityForm({
  bookingId,
  handleCreate,
}: UtilityFormProps) {
  const { register, handleSubmit, reset, formState } =
    useForm<CreateUtilityRequest>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreate)}>
        <input type="hidden" {...register("bookingId")} value={bookingId} />

        {/* plumbingUsage */}
        <div className="mb-2.5 text-lg">
          <label htmlFor="plumbingUsage">หน่วยประปา</label>
          <input
            type="number"
            step="0.01"
            id="plumbingUsage"
            className="input-primary"
            required={true}
            {...register("plumbingUsage", { valueAsNumber: true })}
          />
        </div>

        {/* electricityUsage */}
        <div className="mb-2.5 text-lg">
          <label htmlFor="electricityUsage">หน่วยไฟฟ้า</label>
          <input
            type="number"
            step="0.01"
            id="electricityUsage"
            className="input-primary"
            required={true}
            {...register("electricityUsage", { valueAsNumber: true })}
          />
        </div>

        <SubmitButton text="เพิ่มข้อมูล" />
      </form>
    </div>
  );
}
