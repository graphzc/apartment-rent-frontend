import Payment from "@/interface/Payment";
import { useForm } from "react-hook-form";

interface PaymentFormProps {
    id: number;
    handleUpload: (data: any) => void;
}

export default function PaymentForm({ id, handleUpload } : PaymentFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form className="text-center mt-10" onSubmit={handleSubmit(handleUpload)}>
            <label className="">
                <span className="sr-only">เลือกไฟล์</span>
                <input type="hidden" {...register("id") } value={id} />
                <input type="file" accept="image/png, image/jpeg" className=" w-full text-lg text-slate-500 text-black bg-blue-gray-100 rounded-full
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-md
                    file:bg-violet-50 file:text-violet-700"
                    required {...register("slip")}
                />
                <button type="submit" className="bg-blue-500 text-white rounded-full px-4 py-2 w-full my-5">
                    <span>อัปโหลด</span>
                </button>
            </label>
        </form>
    )
}
