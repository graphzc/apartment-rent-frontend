'use client'

import useBooking from "@/api/booking/useBooking";
import BackButton from "@/components/BackButton"
import DashboardHeader from "@/components/admin/DashboardHeader"
import { ConvertPaymentStatus } from "@/utils/paymentStatusUtils";
import { thDateString } from "@/utils/thDateConvertor";

export default function ViewBooking({params} : {params: {id: string}}) {
    const { data: booking, isPending, error } = useBooking(parseInt(params.id)); 

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <BackButton href="/admin/booking" />
            <DashboardHeader text="ดูการจอง" />
            <div className="mt-2">
                <span className="font-medium">อพาทต์เมนต์</span> : { booking.room.apartment.name } 
            </div>
            <div className="mt-2">
                <span className="font-medium">ผู้จอง</span> : { booking.user.name }
            </div>
            <div className="mt-2">
                <span className="font-medium">เลขห้อง</span> : { booking.room.no }
            </div>
            <div className="mt-2">
                <span className="font-medium">วันเริ่มต้น</span> : { thDateString(booking.startDate) }                
            </div>
            <div className="mt-2">
                <span className="font-medium">วันหมดสัญญา</span> : { thDateString(booking.endDate) }
            </div>
            <div className="mt-2">
                <span className="font-medium">ระยะเวลา</span> : { booking.duration } เดือน
            </div>
            <div className="mt-2">
                <span className="font-medium">สถานะการชำระเงินล่าสุด</span> : { ConvertPaymentStatus(booking.payment[0].status) } 
            </div>
            {
                booking.utility.length == 0 ?
                <div>
                    <div className="mt-2">
                        <span className="font-medium">ค่าน้ำ</span> : <span className="text-red-500">ยังไม่ได้กำหนด</span>
                    </div>
                    <div className="mt-2">
                        <span className="font-medium">ค่าไฟ</span> : <span className="text-red-500">ยังไม่ได้กำหนด</span>
                    </div>
                </div>
                :
                <div>
                    <div className="mt-2">
                        <span className="font-medium">ค่าน้ำ</span> : { booking.utility[0].plumbing * 18 } บาท ({ booking.utility[0].plumbing } หน่วย)
                    </div>
                    <div className="mt-2">
                        <span className="font-medium">ค่าไฟ</span> : { booking.utility[0].electricity * 5 } บาท ({ booking.utility[0].electricity } หน่วย)
                    </div>
                </div>
            }
            <div className="mt-4">
                <a href={`/admin/booking/${params.id}/add-utility`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    เพิ่มข้อมูลค่าน้ำค่าไฟ
                </a>
            </div>

        </div>
    )
}