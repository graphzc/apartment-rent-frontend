"use client";

import useRegister from "@/api/user/useRegister";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { errorAlert } from "@/lib/sweetAlert";

const formSchema = yup.object({
  name: yup.string().required("กรุณากรอกชื่อ"),
  email: yup.string().required("กรุณากรอกอีเมล"),
  telephone: yup
    .string()
    .required("กรุณากรอกเบอร์โทรศัพท์")
    .matches(/^[0-9]+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น")
    .min(10, "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 ตัวอักษร")
    .max(10, "เบอร์โทรศัพท์ต้องไม่เกิน 10 ตัวอักษร"),
  age: yup
    .number()
    .required("กรุณากรอกอายุ")
    .min(1, "อายุไม่สามารถน้อยกว่า 1 ปี")
    .max(120, "อายุไม่สามารถมากกว่า 120 ปี"),
  gender: yup
    .string()
    .required("กรุณาเลือกเพศ")
    .oneOf(["MALE", "FEMALE", "OTHER"], "กรุณาเลือกเพศที่ถูกต้อง"),
  password: yup
    .string()
    .required("กรุณากรอกรหัสผ่าน")
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
  confirmPassword: yup
    .string()
    .required("กรุณากรอกยืนยันรหัสผ่าน")
    .oneOf([yup.ref("password")], "รหัสผ่านไม่ตรงกัน"),
});

type FormSchema = yup.InferType<typeof formSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const registerMutation = useRegister();
  const router = useRouter();

  const handleRegister = async (data: FormSchema) => {
    await registerMutation.mutateAsync(data);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok === true) {
          router.replace("/home");
        } else {
          errorAlert({
            title: "เข้าสู่ระบบล้มเหลว",
            text: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
          });
        }
      })
      .catch(() => {
        errorAlert({
          title: "Login failed",
          text: "Server error please try again later",
        });
      });
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full lg:w-1/2 mx-auto bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">สมัครสมาชิก</h3>
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded mx-auto"
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="name"
                  >
                    ชื่อ
                  </label>
                  <input
                    className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="name"
                    type="name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors?.name?.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    อิีเมล
                  </label>
                  <input
                    className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors?.email?.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    รหัสผ่าน
                  </label>
                  <input
                    className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors?.password?.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="confirm-password"
                  >
                    ยืนยันรหัสผ่าน
                  </label>
                  <input
                    className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="confirm-password"
                    type="password"
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors?.confirmPassword?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="telephone"
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="telephone"
                    type="text"
                    {...register("telephone", { required: true })}
                  />
                  {errors.telephone && (
                    <p className="text-red-500">{errors?.telephone?.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="gender"
                  >
                    เพศ
                  </label>
                  <select
                    className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="gender"
                    {...register("gender", { required: true })}
                  >
                    <option value="">เลือกเพศ</option>
                    <option value="MALE">ชาย</option>
                    <option value="FEMALE">หญิง</option>
                    <option value="OTHER">อื่นๆ</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500">{errors?.gender?.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="age"
                  >
                    อายุ
                  </label>
                  <input
                    className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="age"
                    min={0}
                    type="number"
                    {...register("age", { required: true })}
                  />
                  {errors.age && (
                    <p className="text-red-500">{errors?.age?.message}</p>
                  )}
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white  rounded-full  focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-200 opacity-100 cursor-pointer bg-blue-500 hover:bg-blue-700"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  >
                    เข้าสู่ระบบ
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
