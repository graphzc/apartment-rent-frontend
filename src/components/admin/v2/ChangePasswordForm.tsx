"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AdminChangePasswordRequest } from "@/interface/requests/AdminUserRequest";
import { UserInfo } from "@/interface/User";

// Validation schema
const schema = yup.object({
  newPassword: yup
    .string()
    .required("กรุณากรอกรหัสผ่านใหม่")
    .min(8, "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร"),
  confirmPassword: yup
    .string()
    .required("กรุณายืนยันรหัสผ่าน")
    .oneOf([yup.ref("newPassword")], "รหัสผ่านไม่ตรงกัน"),
});

interface ChangePasswordFormProps {
  user?: UserInfo;
  onSubmit: (data: AdminChangePasswordRequest) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const ChangePasswordForm = ({
  user,
  onSubmit,
  onCancel,
  isLoading,
}: ChangePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AdminChangePasswordRequest & { confirmPassword: string }>({
    resolver: yupResolver(schema),
  });

  const newPassword = watch("newPassword");

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      window.history.back();
    }
  };

  const handleFormSubmit = (
    data: AdminChangePasswordRequest & { confirmPassword: string }
  ) => {
    // Only pass newPassword to the onSubmit function
    onSubmit({ newPassword: data.newPassword });
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.match(/[a-z]/)) score += 1;
    if (password.match(/[A-Z]/)) score += 1;
    if (password.match(/[0-9]/)) score += 1;
    if (password.match(/[^a-zA-Z0-9]/)) score += 1;

    if (score < 2) return { score, label: "อ่อน", color: "text-red-600" };
    if (score < 4) return { score, label: "ปานกลาง", color: "text-yellow-600" };
    return { score, label: "แข็งแรง", color: "text-green-600" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">เปลี่ยนรหัสผ่าน</h2>
        <p className="text-sm text-gray-600 mt-1">
          {user
            ? `กำหนดรหัสผ่านใหม่สำหรับ ${user.name} (${user.email})`
            : "กำหนดรหัสผ่านใหม่"}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        {/* User Info Display */}
        {user && (
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
                <h3 className="text-sm font-medium text-blue-800">
                  ข้อมูลผู้ใช้
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    <strong>ชื่อ:</strong> {user.name}
                  </p>
                  <p>
                    <strong>อีเมล:</strong> {user.email}
                  </p>
                  <p>
                    <strong>บทบาท:</strong>{" "}
                    {user.role === "ADMIN" ? "ผู้ดูแลระบบ" : "ผู้ใช้"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Password Field */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            รหัสผ่านใหม่ *
          </label>
          <input
            type="password"
            id="newPassword"
            {...register("newPassword")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.newPassword ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="กรอกรหัสผ่านใหม่"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.score < 2
                        ? "bg-red-500"
                        : passwordStrength.score < 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${passwordStrength.color}`}
                >
                  {passwordStrength.label}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก
                พิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ยืนยันรหัสผ่านใหม่ *
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.confirmPassword ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="ยืนยันรหัสผ่านใหม่"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Warning */}
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
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
              <h3 className="text-sm font-medium text-red-800">คำเตือนสำคัญ</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>การเปลี่ยนรหัสผ่านจะส่งผลทันที</li>
                  <li>ผู้ใช้จะต้องใช้รหัสผ่านใหม่ในการเข้าสู่ระบบครั้งต่อไป</li>
                  <li>ควรแจ้งให้ผู้ใช้ทราบรหัสผ่านใหม่</li>
                  <li>ตรวจสอบความปลอดภัยของรหัสผ่านก่อนบันทึก</li>
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
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? "กำลังเปลี่ยน..." : "เปลี่ยนรหัสผ่าน"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
