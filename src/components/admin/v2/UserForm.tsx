"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AdminUpdateUserRequest } from "@/interface/requests/AdminUserRequest";
import { UserInfo } from "@/interface/User";
import { Gender } from "@/enum/Gender";
import { UserRole } from "@/enum/UserRole";

// Validation schema
const schema = yup.object({
  name: yup
    .string()
    .required("กรุณากรอกชื่อ")
    .min(2, "ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร")
    .max(100, "ชื่อต้องมีความยาวไม่เกิน 100 ตัวอักษร"),
  telephone: yup
    .string()
    .required("กรุณากรอกเบอร์โทรศัพท์")
    .min(10, "เบอร์โทรต้องมีความยาวอย่างน้อย 10 หลัก")
    .max(15, "เบอร์โทรต้องมีความยาวไม่เกิน 15 หลัก"),
  gender: yup
    .string()
    .required("กรุณาเลือกเพศ")
    .oneOf(Object.values(Gender), "กรุณาเลือกเพศที่ถูกต้อง"),
  age: yup
    .number()
    .required("กรุณากรอกอายุ")
    .min(18, "อายุต้องมากกว่าหรือเท่ากับ 18 ปี")
    .max(120, "อายุต้องน้อยกว่าหรือเท่ากับ 120 ปี"),
  role: yup
    .string()
    .required("กรุณาเลือกบทบาท")
    .oneOf(Object.values(UserRole), "กรุณาเลือกบทบาทที่ถูกต้อง"),
});

interface UserFormProps {
  user?: UserInfo;
  onSubmit: (data: AdminUpdateUserRequest) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  mode: "edit";
}

const UserForm = ({
  user,
  onSubmit,
  onCancel,
  isLoading,
  mode,
}: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminUpdateUserRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      telephone: user?.telephone || "",
      gender: user?.gender || Gender.Male,
      age: user?.age || 18,
      role: user?.role || UserRole.USER,
    },
  });

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      window.history.back();
    }
  };

  const handleFormSubmit = (data: AdminUpdateUserRequest) => {
    onSubmit(data);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          แก้ไขข้อมูลผู้ใช้
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          อัปเดตข้อมูลส่วนตัวและบทบาทของผู้ใช้
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        {/* Email (Read-only) */}
        {user && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              อีเมล
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500"
            />
            <p className="mt-1 text-sm text-gray-500">อีเมลไม่สามารถแก้ไขได้</p>
          </div>
        )}

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
            placeholder="กรอกชื่อ-นามสกุล"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Telephone Field */}
        <div>
          <label
            htmlFor="telephone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            เบอร์โทรศัพท์ *
          </label>
          <input
            type="tel"
            id="telephone"
            {...register("telephone")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.telephone ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="0XX-XXX-XXXX"
          />
          {errors.telephone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.telephone.message}
            </p>
          )}
        </div>

        {/* Gender and Age Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Field */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              เพศ *
            </label>
            <select
              id="gender"
              {...register("gender")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.gender ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value={Gender.Male}>ชาย</option>
              <option value={Gender.Female}>หญิง</option>
              <option value={Gender.Other}>อื่นๆ</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              อายุ *
            </label>
            <input
              type="number"
              id="age"
              min="18"
              max="120"
              {...register("age", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.age ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="25"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>
        </div>

        {/* Role Field */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            บทบาท *
          </label>
          <select
            id="role"
            {...register("role")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.role ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value={UserRole.USER}>ผู้ใช้</option>
            <option value={UserRole.ADMIN}>ผู้ดูแลระบบ</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            การเปลี่ยนบทบาทจะส่งผลต่อสิทธิการเข้าถึงระบบ
          </p>
        </div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-amber-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">
                ข้อควรระวัง
              </h3>
              <div className="mt-2 text-sm text-amber-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>การแก้ไขข้อมูลจะส่งผลกระทบต่อบัญชีผู้ใช้โดยทันที</li>
                  <li>
                    การเปลี่ยนบทบาทเป็น ADMIN จะให้สิทธิการเข้าถึงระบบจัดการ
                  </li>
                  <li>ตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
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
            {isLoading ? "กำลังบันทึก..." : "อัปเดตข้อมูลผู้ใช้"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
