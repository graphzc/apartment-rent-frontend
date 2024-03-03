import { PaymentStatus } from "@/enum/PaymentStatus";

export function ConvertPaymentStatus(status: PaymentStatus) {
    switch (status) {
        case PaymentStatus.UNPAID:
            return <span className='text-orange-500'>ยังไม่ชำระเงิน</span>;
        case PaymentStatus.APPROVED:
            return <span className='text-green-500'>ชำระเงินสำเร็จ</span>;
        case PaymentStatus.REJECTED:
            return <span className='text-red-500'>ชำระเงินไม่สำเร็จ</span>;
        case PaymentStatus.PENDING:
            return <span className='text-blue-500'>รอเช็คการชำระเงิน </span>;
        default:
            return "Unknown";
    }
}

export function convertPaymentStatusToTh(status: PaymentStatus) {
    switch (status) {
        case PaymentStatus.UNPAID:
            return "ยังไม่ชำระเงิน";
        case PaymentStatus.APPROVED:
            return "ชำระเงินสำเร็จ";
        case PaymentStatus.REJECTED:
            return "ชำระเงินไม่สำเร็จ";
        case PaymentStatus.PENDING:
            return "รอเช็คการชำระเงิน";
        default:
            return "Unknown";
    }
}