"use client";

import SubmitButton from "@/components/SubmitButton";
import { CreateNewsRequest } from "@/interface/requests/NewsRequest";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateNewsFormProps {
  handleCreate: (data: CreateNewsRequest) => void;
}

export default function CreateNewsForm({ handleCreate }: CreateNewsFormProps) {
  const { register, handleSubmit, reset, formState } =
    useForm<CreateNewsRequest>();
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

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
              {...register("title")}
            />
          </div>
          <label htmlFor="content">เนื้อหา</label>
          <div className="mb-2">
            <textarea
              className="input-primary"
              required={true}
              {...register("content")}
            />
          </div>

          <div className="mt-2">
            <SubmitButton text="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
