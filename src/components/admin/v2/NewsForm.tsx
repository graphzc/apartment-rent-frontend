"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  CreateNewsRequest,
  UpdateNewsRequest,
} from "@/interface/requests/NewsV2Request";
import { NewsV2 } from "@/interface/NewsV2";

// Validation schema
const schema = yup.object({
  title: yup.string().required("กรุณากรอกชื่อเรื่อง"),
  content: yup.string().required("กรุณากรอกเนื้อหา"),
});

interface NewsFormProps {
  news?: NewsV2;
  onSubmit: (data: CreateNewsRequest | UpdateNewsRequest) => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

const NewsForm = ({ news, onSubmit, isLoading, mode }: NewsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewsRequest | UpdateNewsRequest>({
    resolver: yupResolver(schema),
    defaultValues: news
      ? {
          title: news.title,
          content: news.content,
        }
      : {
          title: "",
          content: "",
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          ชื่อเรื่อง <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.title ? "border-red-300" : ""
          }`}
          placeholder="กรอกชื่อเรื่อง"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          เนื้อหา <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          rows={10}
          {...register("content")}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.content ? "border-red-300" : ""
          }`}
          placeholder="กรอกเนื้อหาข่าวสาร"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              {mode === "create" ? "กำลังเพิ่ม..." : "กำลังแก้ไข..."}
            </>
          ) : (
            <>{mode === "create" ? "เพิ่มข่าวสาร" : "บันทึกการแก้ไข"}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default NewsForm;
