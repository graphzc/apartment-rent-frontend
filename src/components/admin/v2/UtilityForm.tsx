"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  CreateUtilityRequest,
  UpdateUtilityRequest,
} from "@/interface/requests/UtilityRequest";
import Utility from "@/interface/Utility";
import useBookingsV2 from "@/api/booking/useBookingsV2";

// Validation schema
const schema = yup.object({
  bookingId: yup.string().required("กรุณากรอก Booking ID"),
  plumbingUsage: yup
    .number()
    .min(0, "การใช้น้ำต้องมากกว่าหรือเท่ากับ 0")
    .required("กรุณากรอกการใช้น้ำ"),
  electricityUsage: yup
    .number()
    .min(0, "การใช้ไฟต้องมากกว่าหรือเท่ากับ 0")
    .required("กรุณากรอกการใช้ไฟ"),
});

interface UtilityFormProps {
  utility?: Utility;
  onSubmit: (data: any) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

const UtilityForm = ({
  utility,
  onSubmit,
  onCancel,
  isLoading,
  mode,
}: UtilityFormProps) => {
  const { data: bookings, isLoading: isLoadingBookings } = useBookingsV2();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUtilityRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      bookingId: utility?.bookingId || "",
      plumbingUsage: utility?.plumbingUsage || 0,
      electricityUsage: utility?.electricityUsage || 0,
    },
  });

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      window.history.back();
    }
  };

  const handleFormSubmit = (data: CreateUtilityRequest) => {
    if (mode === "create") {
      onSubmit(data as CreateUtilityRequest);
    } else {
      // For edit mode, convert to UpdateUtilityRequest
      const updateData: UpdateUtilityRequest = {
        bookingId: data.bookingId,
        plumbingUsage: data.plumbingUsage,
        electricityUsage: data.electricityUsage,
      };
      onSubmit(updateData);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {mode === "create"
            ? "เพิ่มข้อมูลสาธารณูปโภคใหม่"
            : "แก้ไขข้อมูลสาธารณูปโภค"}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {mode === "create"
            ? "กรอกข้อมูลการใช้สาธารณูปโภคสำหรับการจอง"
            : "แก้ไขข้อมูลการใช้สาธารณูปโภค"}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        {/* Booking ID Field */}
        <div>
          <label
            htmlFor="bookingId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            การจอง *
          </label>
          {mode === "create" ? (
            <select
              id="bookingId"
              {...register("bookingId")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.bookingId ? "border-red-300" : "border-gray-300"
              }`}
              disabled={isLoadingBookings}
            >
              <option value="">เลือกการจอง</option>
              {bookings?.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {booking.userInfo.name} - ห้อง {booking.roomInfo.no} (
                  {booking.apartmentInfo.name})
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id="bookingId"
              {...register("bookingId")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm bg-gray-100 ${
                errors.bookingId ? "border-red-300" : "border-gray-300"
              }`}
              disabled={true}
            />
          )}
          {errors.bookingId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.bookingId.message}
            </p>
          )}
          {mode === "edit" && (
            <p className="mt-1 text-sm text-gray-500">
              การจองไม่สามารถแก้ไขได้
            </p>
          )}
          {isLoadingBookings && mode === "create" && (
            <p className="mt-1 text-sm text-gray-500">
              กำลังโหลดข้อมูลการจอง...
            </p>
          )}
        </div>

        {/* Usage Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plumbing Usage */}
          <div>
            <label
              htmlFor="plumbingUsage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              การใช้น้ำ (หน่วย) *
            </label>
            <input
              type="number"
              id="plumbingUsage"
              step="0.01"
              min="0"
              {...register("plumbingUsage", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.plumbingUsage ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.plumbingUsage && (
              <p className="mt-1 text-sm text-red-600">
                {errors.plumbingUsage.message}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              กรอกจำนวนหน่วยน้ำที่ใช้
            </p>
          </div>

          {/* Electricity Usage */}
          <div>
            <label
              htmlFor="electricityUsage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              การใช้ไฟ (หน่วย) *
            </label>
            <input
              type="number"
              id="electricityUsage"
              step="0.01"
              min="0"
              {...register("electricityUsage", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.electricityUsage ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.electricityUsage && (
              <p className="mt-1 text-sm text-red-600">
                {errors.electricityUsage.message}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">กรอกจำนวนหน่วยไฟที่ใช้</p>
          </div>
        </div>

        {/* Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">ข้อมูลสำคัญ</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>ค่าใช้จ่ายจะคำนวณอัตโนมัติตามอัตราของอพาร์ตเมนต์</li>
                  <li>ข้อมูลจะถูกเชื่อมโยงกับ Billing ID โดยอัตโนมัติ</li>
                  <li>ตรวจสอบ Booking ID ให้ถูกต้องก่อนบันทึก</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
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
              ? "เพิ่มข้อมูลสาธารณูปโภค"
              : "อัปเดตข้อมูลสาธารณูปโภค"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UtilityForm;
