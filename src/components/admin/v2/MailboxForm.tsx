"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  CreateMailboxRequest,
  UpdateMailboxRequest,
} from "@/interface/requests/MailboxV2Request";
import { MailboxV2 } from "@/interface/MailboxV2";
import useBookings from "@/api/booking/useBookings";

// Validation schema
const schema = yup.object({
  toBookingId: yup.string().required("กรุณาเลือกการจอง"),
  title: yup.string().required("กรุณากรอกหัวเรื่อง"),
  content: yup.string().required("กรุณากรอกเนื้อหา"),
});

interface MailboxFormProps {
  mailbox?: MailboxV2;
  onSubmit: (data: CreateMailboxRequest | UpdateMailboxRequest) => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

const MailboxForm = ({
  mailbox,
  onSubmit,
  isLoading,
  mode,
}: MailboxFormProps) => {
  const { data: bookings, isLoading: isLoadingBookings } = useBookings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMailboxRequest | UpdateMailboxRequest>({
    resolver: yupResolver(schema),
    defaultValues: mailbox
      ? {
          toBookingId: mailbox.toBookingId,
          title: mailbox.title,
          content: mailbox.content,
        }
      : {
          toBookingId: "",
          title: "",
          content: "",
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Booking Selection */}
      <div>
        <label
          htmlFor="toBookingId"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          การจอง <span className="text-red-500">*</span>
        </label>
        <select
          id="toBookingId"
          {...register("toBookingId")}
          disabled={isLoadingBookings}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.toBookingId ? "border-red-300" : ""
          }`}
        >
          <option value="">เลือกการจอง</option>
          {bookings?.map((booking) => (
            <option key={booking.id} value={booking.id}>
              {booking.userInfo?.name} - ห้อง {booking.roomInfo?.no}
            </option>
          ))}
        </select>
        {errors.toBookingId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.toBookingId.message}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          หัวเรื่อง <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.title ? "border-red-300" : ""
          }`}
          placeholder="กรอกหัวเรื่อง"
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
          rows={8}
          {...register("content")}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.content ? "border-red-300" : ""
          }`}
          placeholder="กรอกเนื้อหาข้อความ"
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
            <>{mode === "create" ? "ส่งข้อความ" : "บันทึกการแก้ไข"}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default MailboxForm;
