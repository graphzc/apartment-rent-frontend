'use client'

import { errorAlert } from "@/lib/sweetAlert"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface ILoginInput {
    email: string
    password: string
}

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<ILoginInput>();
    const router = useRouter();

    const handleLogin = async (data: ILoginInput) => {
        signIn('credentials', {
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

    return (
        <div>
            {/* Login form with email input and password input */}
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    {/* Row */}
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="w-full lg:w-1/2 mx-auto bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">เข้าสู่ระบบ</h3>
                            <form onSubmit={handleSubmit(handleLogin)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded mx-auto" >
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        อิีเมล
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="mail@example.com"
                                        { ...register("email", { required: true }) }
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        รหัสผ่าน
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 mb-3 text-sm  text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                        { ...register("password", { required: true }) }
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        เข้าสู่ระบบ
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <Link  
                                        href="/register"
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    >
                                        สมัครสมาชิก
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