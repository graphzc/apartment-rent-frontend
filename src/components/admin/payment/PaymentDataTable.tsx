'use client'

import ActionButton from "@/components/ActionButton";
import PaymentStatusBadge from "@/components/PaymentStatusBadge";
import Payment from "@/interface/Payment";
import { useRouter } from "next/navigation";
import { TableColumn } from "react-data-table-component";
import DataTable from "@/components/DataTable";

interface PaymentDataTableProps {
    data: Payment[];
}

export default function PaymentDataTable({ data }: PaymentDataTableProps) {
    const router = useRouter();

    const handleView = (id: number) => {
        router.push(`/admin/payment/${id}`)
    }

    const columns: TableColumn<Payment>[] = [
        {
            name: 'ID',
            selector: (row: Payment) => row.id!,
            sortable: true,
        },
        {
            name: 'ห้อง',
            selector: (row: Payment) => row.booking.room.no!,
            sortable: true,
        },
        {
            name: 'จำนวนเงิน',
            selector: (row: Payment) => row.amount!,
            sortable: true,
        },
        {
            name: 'สถานะ',
            cell: (row: Payment) => <PaymentStatusBadge status={row.status} />,
            sortable: true,
        },
        {
            name: '',
            cell: (row: Payment) => <ActionButton<number> id={row.id!} handleView={handleView} />
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}