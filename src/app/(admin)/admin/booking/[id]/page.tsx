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
        </div>
    )
}