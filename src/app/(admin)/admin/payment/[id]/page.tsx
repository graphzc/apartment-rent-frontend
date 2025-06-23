'use client'

import useAdminChangePaymentStatus from "@/api/payment/useAdminChangePaymentStatus";
import useAdminPayment from "@/api/payment/useAdminPayment";
import BackButton from "@/components/BackButton";
import { PaymentStatus } from "@/enum/PaymentStatus";
import { convertPaymentStatusToTh } from "@/utils/paymentStatusUtils";
import { useParams } from "next/navigation";
import { env } from 'next-runtime-env';

export default function PaymentInfoAdmin() {
    const { id } = useParams<{ id: string }>();

    const mutatioin = useAdminChangePaymentStatus();
    const { data: payment, isPending, error } = useAdminPayment(parseInt(id));

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleAccept = () => {
        mutatioin.mutate({ id: parseInt(id), status: PaymentStatus.APPROVED });
    }

    const handleReject = () => {
        mutatioin.mutate({ id: parseInt(id), status: PaymentStatus.REJECTED });
    }

    return (
        <div>
            {/* Back */}
            <BackButton href="/admin/payment" />

            <h1 className="text-xl">
                รายละเอียดการชำระเงิน
            </h1>

            <div>
                <p><b>ID:</b> {payment?.id}</p>
                <p><b>จำนวนเงิน:</b>: {payment?.amount}</p>
                <p><b>สถานะ: </b> { convertPaymentStatusToTh(payment?.status) }</p>
                <p><b>ห้อง: </b>: {payment?.booking?.room?.no}</p>
                { payment.status !== PaymentStatus.UNPAID  && 
                    <img src={ `${env('NEXT_PUBLIC_BASE_BACKEND_URL')}/upload/slip/${payment.slip}`} width="500px" /> 
                }

                {/* Accept and reject button */}
                <div className="mt-2 flex gap-3">
                    <button 
                        className="bg-green-500 text-white px-3 py-2 rounded-lg"
                        onClick={() => {
                            handleAccept();                        
                        }}
                    >
                        ยอมรับ
                    </button>
                    <button 
                        className="bg-red-500 text-white px-3 py-2 rounded-lg"
                        onClick={() => {
                            handleReject();
                        }}
                    >
                        ปฏิเสธ
                    </button>
                </div>

            </div>

        </div>
    ) 
}