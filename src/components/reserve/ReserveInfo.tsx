'use client'

import useBooking from "@/api/booking/useBooking";
import { PaymentStatus } from "@/enum/PaymentStatus";
import { convertPaymentStatus } from "@/utils/paymentStatusUtils";
import Link from "next/link";

interface ReserveInfoProps {
    id: number;
}

export default function ReserveInfo({ id } : ReserveInfoProps) {
    const { data: booking, isLoading, error } = useBooking(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }


    return (
        <div>
            <div>
                <div><b>ห้อง</b> {booking?.room.no}</div>
                <div><b>ระยะเวลา</b> { new Date(booking?.startDate!).toDateString() } -  { new Date(booking?.endDate!).toDateString() }</div>
                <div><b>ราคาต่อเดือน</b> {booking?.room.price} บาท/เดือน</div>
            </div>
            <div>
                <h2 className="text-xl font-bold mt-4">รายการชำระเงิน</h2>
                {booking?.payment.map((payment) => (
                    <div key={payment.id} className="flex mt-2 border border-gray-400 px-6 py-3 rounded-lg text-left w-full justify-between content-center">
                        <div>
                            วันที่สร้าง: {new Date(payment.createdAt).toDateString()} <br />
                            จำนวนเงิน: {payment.amount} บาท <br />
                            สถานะ: { convertPaymentStatus(payment.status) }
                        </div>
                        { payment.status === PaymentStatus.UNPAID &&
                            <Link href={`/payment/${payment.id}`} className="flex flex-col justify-center">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg my-auto">ชำระเงิน</button>
                            </Link>
                        }
                    </div>
                ))}
            </div>
        </div>
    ); 
}