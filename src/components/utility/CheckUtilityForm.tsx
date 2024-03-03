import Utility from "@/interface/Utility";
import { useForm } from "react-hook-form";

interface CheckUtilityFormProps {
    handleCheck: (utility: Utility) => void;
}

export default function CheckUtilityForm({ handleCheck } : CheckUtilityFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Utility>();
    
    return (
        <form onSubmit={handleSubmit(handleCheck)}>
            <div className="mb-2.5 text-lg">
                <label htmlFor="plumbing">หน่วยน้ำประปา</label>
                <input
                    type="number"
                    id="plumbing"
                    className="input-primary"
                    required={true}
                    {...register('plumbing')}
                />
            </div>
            <div className="mb-2.5 text-lg">
                <label htmlFor="electric">หน่วยไฟฟ้า</label>
                <input
                    type="number"
                    id="electric"
                    className="input-primary"
                    required={true}
                    {...register('electricity')}
                />
            </div>
            
            <button type="submit" className="submit-button">
                ตรวจสอบ
            </button>
        </form>
    )
}
