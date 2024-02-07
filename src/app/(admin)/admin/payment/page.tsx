'use client'

import useAdminPayments from "@/api/payment/useAdminPayments";
import DashboardHeader from "@/components/admin/DashboardHeader";
import PaymentDataTable from "@/components/admin/payment/PaymentDataTable";

export default function PaymentAdmin() {
    const { data: payments, isPending, error } = useAdminPayments();

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <DashboardHeader text="จัดการการชำระเงิน" />
            <PaymentDataTable data={payments!} />
        </div>
    )
}