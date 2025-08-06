"use client";

import { CreateRoomRequest } from "@/interface/requests/RoomRequest";
import Apartment from "@/interface/Apartment";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Session } from "next-auth";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton";

interface CreateRoomFormProps {
  apartments: Apartment[];
  handleCreate: (data: CreateRoomRequest) => void;
}

export default function CreateRoomForm({
  handleCreate,
  apartments,
}: CreateRoomFormProps) {
  const { register, handleSubmit, reset, formState } =
    useForm<CreateRoomRequest>();
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className="mb-2.5 text-lg">
          <label htmlFor="no">เลขห้องพัก</label>
          <input
            type="text"
            id="no"
            className="input-primary"
            required={true}
            {...register("no")}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="description">รายละเอียด</label>
          <textarea
            id="description"
            className="input-primary"
            {...register("description")}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="apartment">เลือกอพาร์ทเม้นท์</label>
          <select
            id="apartment"
            className="input-primary"
            required={true}
            {...register("apartmentId")}
          >
            <option value="">-- เลือกอพาร์ทเม้นท์ --</option>
            {apartments?.map((apartment) => (
              <option key={apartment.id} value={apartment.id}>
                {" "}
                {apartment.name}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="monthlyPrice">ราคาเช่ารายเดือน</label>
          <input
            type="number"
            id="monthlyPrice"
            className="input-primary"
            required={true}
            {...register("monthlyPrice", { valueAsNumber: true })}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="securityDeposit">เงินประกัน</label>
          <input
            type="number"
            id="securityDeposit"
            className="input-primary"
            required={true}
            {...register("securityDeposit", { valueAsNumber: true })}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="address">ที่อยู่</label>
          <textarea
            id="address"
            className="input-primary"
            required={true}
            {...register("address")}
          />
        </div>

        <SubmitButton text="Submit" />
      </form>
    </div>
  );
}
