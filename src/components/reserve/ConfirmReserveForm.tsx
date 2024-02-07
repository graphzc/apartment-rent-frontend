import Booking from "@/interface/Booking";
import Room from "@/interface/Room";
import { User } from "next-auth";
import { useForm } from "react-hook-form";

interface ConfirmReserveFormProps {
    user: User;
    room: Room;
    onSubmit: (data: any) => void;
}

export default function ConfirmReserveForm({ user, room, onSubmit }: ConfirmReserveFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<Booking>();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('userId')} value={user.id} required />
            <input type="hidden" {...register('roomId')} value={room.id} required />
            <div className="mb-4">
                <div><b>ผู้เช่า :</b> <input type="text" className="input-primary bg-gray-100" value={ user.name } disabled={ true }  /></div>
            </div>
            <div className="mb-4">
                <div><b>วันเริ่มต้น</b></div>
                <input type="date" className="input-primary" {...register('startDate')} defaultValue={new Date().toISOString().substring(0, 10)} required />
            </div>
            <div className="mb-4">
                <div><b>จำนวนเดือน</b></div>
                <select className="input-primary" {...register('duration')} required >
                    <option value={ 6 }>6 เดือน</option>
                    <option value={ 12 }>12 เดือน</option>
                    <option value={ 18 }>18 เดือน</option>
                </select>
            </div>
            <div className="mb-4">
                <input type="checkbox" id="accept-condition" required /> <label htmlFor="accept-condition">ยอมรับสัญญาเช่า</label> 
            </div>
            <div className="mb-4">
                <button type="submit" className="submit-button">
                    ยืนยัน
                </button>
            </div>
        </form>
    );
}