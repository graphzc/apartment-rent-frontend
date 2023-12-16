'use client'

import useRegister from "@/api/user/useRegister";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { errorAlert } from "@/lib/sweetAlert";
import { useState } from "react";

const formSchema = yup.object({
    name: yup.string()
        .required('กรุณากรอกชื่อ'),
    email: yup.string()
        .required('กรุณากรอกอีเมล'),
    password: yup.string()
        .required('กรุณากรอกรหัสผ่าน')
        .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
    confirmPassword: yup.string()
        .required('กรุณากรอกยืนยันรหัสผ่าน')
        .oneOf([yup.ref('password')], 'รหัสผ่านไม่ตรงกัน'),
});

type FormSchema = yup.InferType<typeof formSchema>

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: { errors, isSubmitSuccessful }} = useForm({
        resolver: yupResolver(formSchema),
    })
    const registerMutation = useRegister();
    const router = useRouter();

    const handleRegister = async (data: FormSchema) => {
        registerMutation.mutate(data);
        setIsLoading(true);
        if (isSubmitSuccessful) {
            await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((res) => {
                if (res?.ok === true) {
                    router.replace('/');
                } else {
                    errorAlert({
                        title: 'Login failed',
                        text: 'Invalid username or password',
                    });
                }
            }).catch((err) => {
                errorAlert({
                    title: 'Login failed',
                    text: 'Server error please try again later',
                });
            });
        }
        setIsLoading(false);
    }

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
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
                                        ชื่อ
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="name"
                                        { ...register("name", { required: true }) }
                                    />
                                    {errors.name && <p className="text-red-500">{errors?.name?.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        อิีเมล
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        { ...register("email", { required: true }) }
                                    />
                                    {errors.email && <p className="text-red-500">{errors?.email?.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        รหัสผ่าน
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                        { ...register("password", { required: true }) }
                                    />
                                    {errors.password && <p className="text-red-500">{errors?.password?.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirm-password">
                                        ยืนยันรหัสผ่าน
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                                        id="confirm-password"
                                        type="password"
                                        placeholder="******************"
                                        { ...register("confirmPassword", { required: true }) }
                                    />
                                    {errors.confirmPassword && <p className="text-red-500">{errors?.confirmPassword?.message}</p>}
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className={ `w-full px-4 py-2 font-bold text-white  
                                                    rounded-full  focus:outline-none focus:shadow-outline 
                                                    ${isLoading ? 'opacity-50 cursor-not-allowed bg-blue-200' : 'opacity-100 cursor-pointer bg-blue-500 hover:bg-blue-700'}
                                                    ` }
                                        type="submit"
                                        
                                    >
                                        สมัครสมาชิก
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
    )
}