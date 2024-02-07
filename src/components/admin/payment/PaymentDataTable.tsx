'use client'

import ActionButton from "@/components/ActionButton";
import Payment from "@/interface/Payment";
import { useRouter } from "next/navigation";
import DataTable, { TableColumn } from "react-data-table-component";

interface PaymentDataTableProps {
    data: Payment[];
}

export default function PaymentDataTable({ data }: PaymentDataTableProps) {
    const router = useRouter();
    const handleDelete = (id: number) => {
        router.push(`/admin/payment/${id}`)
    }
    const handleEdit = (id: number) => {
        router.push(`/admin/payment/${id}`)
    }
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
            selector: (row: Payment) => row.status!,
            sortable: true,
        },
        {
            name: '',
            cell: (row: Payment) => <ActionButton<number> id={row.id!} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}