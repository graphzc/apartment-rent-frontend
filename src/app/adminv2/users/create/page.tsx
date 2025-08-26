"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useRegister from "@/api/user/useRegister";
import { UserRole } from "@/enum/UserRole";
import { Gender } from "@/enum/Gender";
import Swal from "sweetalert2";

interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  telephone: string;
  age: number;
  gender: Gender;
}

const CreateUserPage = () => {
  const router = useRouter();
  const { mutateAsync, isPending, isError, error } = useRegister();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUserForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      telephone: "",
      age: undefined,
      gender: Gender.Other,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: CreateUserForm) => {
    if (data.password !== data.confirmPassword) {
      setFormError("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setFormError(null);

    await mutateAsync(
      {
        name: data.name,
        email: data.email,
        age: data.age,
        gender: data.gender,
        telephone: data.telephone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "สำเร็จ!",
            text: "สร้างผู้ใช้ใหม่เรียบร้อยแล้ว",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            router.push("/adminv2/users");
          });
        },
        onError: (error: any) => {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: error.response?.data?.message || "ไม่สามารถสร้างผู้ใช้ได้",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">สร้างผู้ใช้ใหม่</h1>
        <p className="text-gray-600 mt-1">
          กรอกข้อมูลเพื่อสร้างบัญชีผู้ใช้ใหม่ในระบบ
        </p>
      </div>

      {/* Form */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {formError && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md">
              {formError}
            </div>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              ชื่อ-นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "กรุณากรอกชื่อ-นามสกุล" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              อีเมล <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "กรุณากรอกอีเมล",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "รูปแบบอีเมลไม่ถูกต้อง",
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Telephone */}
          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-700"
            >
              เบอร์โทรศัพท์
            </label>
            <input
              id="telephone"
              type="tel"
              {...register("telephone", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "กรุณากรอกเบอร์โทรศัพท์ 10 หลัก",
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.telephone ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.telephone && (
              <p className="mt-2 text-sm text-red-600">
                {errors.telephone.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              อายุ
            </label>
            <input
              id="age"
              type="number"
              min="1"
              max="120"
              {...register("age", {
                min: {
                  value: 1,
                  message: "อายุต้องมากกว่า 0",
                },
                max: {
                  value: 120,
                  message: "อายุต้องไม่เกิน 120 ปี",
                },
                valueAsNumber: true,
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.age ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.age && (
              <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              เพศ
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value={Gender.Male}>ชาย</option>
              <option value={Gender.Female}>หญิง</option>
              <option value={Gender.Other}>อื่นๆ</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              รหัสผ่าน <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "กรุณากรอกรหัสผ่าน",
                minLength: {
                  value: 6,
                  message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "กรุณายืนยันรหัสผ่าน",
                validate: (value) => value === password || "รหัสผ่านไม่ตรงกัน",
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2"></div>
                  กำลังบันทึก...
                </div>
              ) : (
                "สร้างผู้ใช้"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
