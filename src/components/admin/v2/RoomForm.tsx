"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CreateRoomRequest, UpdateRoomRequest } from "@/interface/requests/RoomV2Request";
import { RoomV2 } from "@/interface/RoomV2";
import useApartmentsV2 from "@/api/apartment/useApartmentsV2";

// Validation schema
const schema = yup.object({
  no: yup.string().required("กรุณากรอกหมายเลขห้อง"),
  description: yup.string(),
  apartmentId: yup.string().required("กรุณาเลือกอพาร์ตเมนต์"),
  monthlyPrice: yup.number().min(0.01, "ราคารายเดือนต้องมากกว่า 0").required("กรุณากรอกราคารายเดือน"),
  securityDeposit: yup.number().min(0.01, "เงินประกันต้องมากกว่า 0").required("กรุณากรอกเงินประกัน"),
  address: yup.string().required("กรุณากรอกที่อยู่"),
});

interface RoomFormProps {
  room?: RoomV2;
  onSubmit: (data: CreateRoomRequest | UpdateRoomRequest) => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

const RoomForm = ({ room, onSubmit, isLoading, mode }: RoomFormProps) => {
  const { data: apartments, isLoading: isLoadingApartments } = useApartmentsV2();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      no: room?.no || "",
      description: room?.description || "",
      apartmentId: room?.apartmentId || "",
      monthlyPrice: room?.monthlyPrice || 0,
      securityDeposit: room?.securityDeposit || 0,
      address: room?.address || "",
    },
  });

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {mode === "create" ? "เพิ่มห้องพักใหม่" : "แก้ไขห้องพัก"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Room Number and Apartment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Number */}
          <div>
            <label htmlFor="no" className="block text-sm font-medium text-gray-700 mb-1">
              หมายเลขห้อง *
            </label>
            <input
              type="text"
              id="no"
              {...register("no")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.no ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="เช่น 101, A-201"
            />
            {errors.no && <p className="mt-1 text-sm text-red-600">{errors.no.message}</p>}
          </div>

          {/* Apartment Selection */}
          <div>
            <label htmlFor="apartmentId" className="block text-sm font-medium text-gray-700 mb-1">
              อพาร์ตเมนต์ *
            </label>
            <select
              id="apartmentId"
              {...register("apartmentId")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.apartmentId ? "border-red-300" : "border-gray-300"
              }`}
              disabled={isLoadingApartments}
            >
              <option value="">เลือกอพาร์ตเมนต์</option>
              {apartments?.map((apartment) => (
                <option key={apartment.id} value={apartment.id}>
                  {apartment.name}
                </option>
              ))}
            </select>
            {errors.apartmentId && <p className="mt-1 text-sm text-red-600">{errors.apartmentId.message}</p>}
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            ที่อยู่ *
          </label>
          <textarea
            id="address"
            rows={3}
            {...register("address")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.address ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="กรอกที่อยู่ของห้องพัก"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            รายละเอียด
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="กรอกรายละเอียดห้องพัก (ไม่บังคับ)"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        {/* Price Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Price */}
          <div>
            <label htmlFor="monthlyPrice" className="block text-sm font-medium text-gray-700 mb-1">
              ราคารายเดือน (฿) *
            </label>
            <input
              type="number"
              id="monthlyPrice"
              step="0.01"
              min="0"
              {...register("monthlyPrice", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.monthlyPrice ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.monthlyPrice && <p className="mt-1 text-sm text-red-600">{errors.monthlyPrice.message}</p>}
          </div>

          {/* Security Deposit */}
          <div>
            <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700 mb-1">
              เงินประกัน (฿) *
            </label>
            <input
              type="number"
              id="securityDeposit"
              step="0.01"
              min="0"
              {...register("securityDeposit", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.securityDeposit ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.securityDeposit && <p className="mt-1 text-sm text-red-600">{errors.securityDeposit.message}</p>}
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
            {isLoading ? "กำลังบันทึก..." : mode === "create" ? "เพิ่มห้องพัก" : "อัปเดตห้องพัก"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomForm;
