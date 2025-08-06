"use client";

import SubmitButton from "@/components/SubmitButton";
import News from "@/interface/News";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditApartmentFormProps {
  news: News;
  handleEdit: (data: News) => void;
}

export default function EditNewsForm({
  news,
  handleEdit,
}: EditApartmentFormProps) {
  const { register, handleSubmit, reset, formState } = useForm<News>();
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleEdit)}>
        <input type="hidden" value={news.id} {...register("id")} />
        <div className="mb-2.5 text-lg">
          <label htmlFor="title">หัวข้อ</label>
          <div className="mb-2">
            <input
              type="text"
              className="input-primary"
              required={true}
              defaultValue={news.title}
              {...register("title")}
            />
          </div>
          <label htmlFor="content">เนื้อหา</label>
          <div className="mb-2">
            <textarea
              className="input-primary"
              required={true}
              defaultValue={news.content}
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
