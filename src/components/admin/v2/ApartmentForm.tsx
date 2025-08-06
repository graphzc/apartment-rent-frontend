"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  CreateApartmentRequest,
  UpdateApartmentRequest,
} from "@/interface/requests/ApartmentV2Request";
import Apartment from "@/interface/Apartment";

// Validation schema
const schema = yup.object({
  name: yup.string().required("กรุณากรอกชื่อ"),
  description: yup.string().required("กรุณากรอกรายละเอียด"),
  plumbingPrice: yup
    .number()
    .min(0.01, "ราคาน้ำประปาต้องมากกว่า 0")
    .required("กรุณากรอกราคาน้ำประปา"),
  electricityPrice: yup
    .number()
    .min(0.01, "ราคาไฟฟ้าต้องมากกว่า 0")
    .required("กรุณากรอกราคาไฟฟ้า"),
});

interface ApartmentFormProps {
  apartment?: Apartment;
  onSubmit: (data: CreateApartmentRequest | UpdateApartmentRequest) => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

const ApartmentForm = ({
  apartment,
  onSubmit,
  isLoading,
  mode,
}: ApartmentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApartmentRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: apartment?.name || "",
      description: apartment?.description || "",
      plumbingPrice: apartment?.plumbingPrice || 0,
      electricityPrice: apartment?.electricityPrice || 0,
    },
  });

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {mode === "create" ? "เพิ่มอพาร์ตเมนต์ใหม่" : "แก้ไขอพาร์ตเมนต์"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ชื่อ *
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="กรอกชื่ออพาร์ตเมนต์"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            รายละเอียด *
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="กรอกรายละเอียดอพาร์ตเมนต์"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plumbing Price */}
          <div>
            <label
              htmlFor="plumbingPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ราคาน้ำประปา (฿) *
            </label>
            <input
              type="number"
              id="plumbingPrice"
              step="0.01"
              min="0"
              {...register("plumbingPrice", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.plumbingPrice ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.plumbingPrice && (
              <p className="mt-1 text-sm text-red-600">
                {errors.plumbingPrice.message}
              </p>
            )}
          </div>

          {/* Electricity Price */}
          <div>
            <label
              htmlFor="electricityPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ราคาไฟฟ้า (฿/หน่วย) *
            </label>
            <input
              type="number"
              id="electricityPrice"
              step="0.01"
              min="0"
              {...register("electricityPrice", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.electricityPrice ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.electricityPrice && (
              <p className="mt-1 text-sm text-red-600">
                {errors.electricityPrice.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading
              ? "กำลังบันทึก..."
              : mode === "create"
              ? "เพิ่มอพาร์ตเมนต์"
              : "อัปเดตอพาร์ตเมนต์"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApartmentForm;
