import usePayment from "@/api/payment/usePayment";

interface PaymentInfoProps {
    id: number;
}

export default function PaymentInfo({ id }: PaymentInfoProps) {
    const { data: payment, isLoading, error } = usePayment(id);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <div className="text-2xl font-bold">
              ชำระเงินสำหรับ
            </div>
            <div className="text-xl">
                รหัสการจอง: {payment?.bookingId} <br />
                ห้องพัก: {payment?.booking.room.no} <br />
                ราคา: {payment?.amount} บาท
            </div>
        </div>
    )
}
