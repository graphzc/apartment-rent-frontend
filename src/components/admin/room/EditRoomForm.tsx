"use client";

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

export default function EditRoomForm({
  room,
  apartments,
  handleUpdate,
}: EditRoomFormProps) {
  const { register, handleSubmit, reset, formState } = useForm<Room>();
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);
  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <input type="hidden" value={room.id} {...register("id")} />

        <div className="mb-2.5 text-lg">
          <label htmlFor="no">เลขห้องพัก</label>
          <input
            type="text"
            id="no"
            className="input-primary"
            required={true}
            defaultValue={room.no}
            {...register("no")}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="description">รายละเอียด</label>
          <textarea
            id="description"
            className="input-primary"
            defaultValue={room.description}
            {...register("description")}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="apartment">เลือกอพาร์ทเม้นท์</label>
          <select
            id="apartment"
            className="input-primary"
            required={true}
            defaultValue={room.apartmentId}
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
            defaultValue={room.monthlyPrice}
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
            defaultValue={room.securityDeposit}
            {...register("securityDeposit", { valueAsNumber: true })}
          />
        </div>

        <div className="mb-2.5 text-lg">
          <label htmlFor="address">ที่อยู่</label>
          <textarea
            id="address"
            className="input-primary"
            required={true}
            defaultValue={room.address}
            {...register("address")}
          />
        </div>

        <SubmitButton text="บันทึก" />
      </form>
    </div>
  );
}
