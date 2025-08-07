"use client";

import useChangePassword from "@/api/user/useChangePassword";
import { ChangePasswordSchema } from "@/interface/ChangePasswordSchema";
import { errorAlert } from "@/lib/sweetAlert";
import { yupResolver } from "@hookform/resolvers/yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("กรุณากรอกรหัสผ่านเดิม"),
  newPassword: yup
    .string()
    .required("กรุณากรอกรหัสผ่านใหม่")
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
  confirmPassword: yup
    .string()
    .required("กรุณากรอกยืนยันรหัสผ่าน")
    .oneOf([yup.ref("newPassword")], "รหัสผ่านไม่ตรงกัน"),
});

interface ChangePasswordFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordForm({
  isOpen,
  onClose,
}: ChangePasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema),
  });

  const changePasswordMutation = useChangePassword();

  const handleChangePassword = async (data: ChangePasswordSchema) => {
    try {
      await changePasswordMutation.mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
      reset();
      onClose();
    } catch (error: any) {
      errorAlert({
        title: "เปลี่ยนรหัสผ่านล้มเหลว",
        text:
          error.response?.data?.message || "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                เปลี่ยนรหัสผ่าน
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleChangePassword)}>
              <div className="space-y-4">
                {/* Old Password */}
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    รหัสผ่านเดิม
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    {...register("oldPassword")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="กรอกรหัสผ่านเดิม"
                  />
                  {errors.oldPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    รหัสผ่านใหม่
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    {...register("newPassword")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="กรอกรหัสผ่านใหม่"
                  />
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ยืนยันรหัสผ่านใหม่
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "กำลังเปลี่ยน..." : "เปลี่ยนรหัสผ่าน"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
