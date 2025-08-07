import { PaymentStatus } from "@/enum/PaymentStatus"
import { convertPaymentStatusToTh } from "@/utils/paymentStatusUtils";

interface PaymentStatusBadgeProps {
    status: PaymentStatus;
}

export default function PaymentStatusBadge({ status } : PaymentStatusBadgeProps) {
    let color = "";
    switch (status) {
        case PaymentStatus.APPROVED:
            color = "bg-green-500";
            break;
        case PaymentStatus.UNPAID:
            color = "bg-orange-500";
            break;
        case PaymentStatus.PENDING:
            color = "bg-yellow-800";
            break;
        case PaymentStatus.REJECTED:
            color = "bg-red-500";
            break;
    }


    return (
        <span className={`px-2 py-1 text-white rounded-md ${color}`}>
            { convertPaymentStatusToTh(status) }
        </span>
    )
}