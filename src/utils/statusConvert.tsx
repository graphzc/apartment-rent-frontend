import { PaymentStatus } from "@/enum/PaymentStatus";

export default function convertPaymentStatus(status: PaymentStatus) {
    switch (status) {
        case PaymentStatus.UNPAID:
            return <span className='text-red-500'>ยังไม่ชำระเงิน</span>;
        case PaymentStatus.APPROVED:
            return <span className='text-green-500'>ชำระเงินสำเร็จ</span>;
        case PaymentStatus.REJECTED:
            return <span className='text-red-500'>ชำระเงินไม่สำเร็จ</span>;
        case PaymentStatus.PENDING:
            return <span className='text-yellow-500'>รอเช็คการชำระเงิน </span>;
        default:
            return "Unknown";
    }
}