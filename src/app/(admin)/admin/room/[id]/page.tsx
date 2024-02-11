'use client'

import useRoom from "@/api/room/useRoom";
import BackButton from "@/components/BackButton";
import { PaymentStatus } from "@/enum/PaymentStatus";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ViewRoomPage({params} : {params: {id: string}}) {
    
    const router = useRouter();

    const { isPending, error, data: room } = useRoom(parseInt(params.id));

    if (isPending) return <div>Loading...</div>;

    if (error) return <div>{ error.message }</div>;

    const isAvaliable = room.booking.length > 0 && room.booking[0].endDate < new Date() && room.booking[0].payment.length > 0 && room.booking[0].payment[0].status !== PaymentStatus.UNPAID || room.booking.length == 0;
    
    console.log(isAvaliable);
    return (
        <div>
            <BackButton href="/admin/room" />
            <h1 className="text-xl mb-5">ข้อมูลห้องพัก</h1>
            <div>
                <div><span className="font-medium">เลขห้อง</span> : { room?.no }</div>
                <div><span className="font-medium">ราคา</span> : { room?.price }</div>
                <div><span className="font-medium">อพาร์ทเม้นท์</span> : { room?.apartment.name }</div>
                <div><span className="font-medium">สถานะ</span> : { isAvaliable ? 'ว่าง' : 'ไม่ว่าง' }</div>
                { 
                    !isAvaliable && (
                        <>
                            <div><span className="font-medium">ผู้เช่า</span> : { room.booking[0].user.name }</div> 
                            <div><span className="font-medium">สัญญา</span> : { new Date(room.booking[0].startDate).toLocaleDateString() } - { new Date(room.booking[0].endDate).toLocaleDateString() }</div>
                        </>

                    )    
                }

            </div>


        </div>
    );
}