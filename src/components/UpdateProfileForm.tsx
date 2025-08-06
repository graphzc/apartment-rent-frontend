"use client";

import useUpdateProfile from "@/api/user/useUpdateProfile";
import { Gender } from "@/enum/Gender";
import { UpdateUserRequest } from "@/interface/UpdateUserSchema";
import { UserInfo } from "@/interface/User";
import { errorAlert } from "@/lib/sweetAlert";
import { yupResolver } from "@hookform/resolvers/yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const updateProfileSchema = yup.object({
  name: yup
    .string()
    .required("กรุณากรอกชื่อ")
    .min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร")
    .max(100, "ชื่อต้องไม่เกิน 100 ตัวอักษร"),
  telephone: yup
    .string()
    .required("กรุณากรอกเบอร์โทรศัพท์")
    .matches(/^[0-9]+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น")
    .min(10, "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 ตัว")
    .max(15, "เบอร์โทรศัพท์ต้องไม่เกิน 15 ตัว"),
  gender: yup
    .mixed<Gender>()
    .required("กรุณาเลือกเพศ")
    .oneOf(Object.values(Gender), "กรุณาเลือกเพศที่ถูกต้อง"),
  age: yup
    .number()
    .required("กรุณากรอกอายุ")
    .min(18, "อายุต้องอย่างน้อย 18 ปี")
    .max(120, "อายุต้องไม่เกิน 120 ปี"),
});

interface UpdateProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserInfo: UserInfo;
}

export default function UpdateProfileForm({
  isOpen,
  onClose,
  currentUserInfo,
}: UpdateProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateUserRequest>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: currentUserInfo.name,
      telephone: currentUserInfo.telephone,
      gender: currentUserInfo.gender,
      age: currentUserInfo.age,
    },
  });

  const updateProfileMutation = useUpdateProfile();

  const handleUpdateProfile = async (data: UpdateUserRequest) => {
    try {
      await updateProfileMutation.mutateAsync(data);

      toast.success("อัปเดตข้อมูลโปรไฟล์สำเร็จ");
      onClose();
    } catch (error: any) {
      errorAlert({
        title: "อัปเดตข้อมูลล้มเหลว",
        text:
          error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
      });
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                แก้ไขข้อมูลโปรไฟล์
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="กรอกชื่อ"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Telephone */}
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    หมายเลขโทรศัพท์
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    {...register("telephone")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="กรอกหมายเลขโทรศัพท์"
                  />
                  {errors.telephone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.telephone.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    เพศ
                  </label>
                  <select
                    id="gender"
                    {...register("gender")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">เลือกเพศ</option>
                    <option value={Gender.Male}>ชาย</option>
                    <option value={Gender.Female}>หญิง</option>
                    <option value={Gender.Other}>อื่น ๆ</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    อายุ
                  </label>
                  <input
                    type="number"
                    id="age"
                    {...register("age", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="กรอกอายุ"
                    min="18"
                    max="120"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.age.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "กำลังอัปเดต..." : "อัปเดตข้อมูล"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
