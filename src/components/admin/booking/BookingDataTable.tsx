'use client'

import ActionButton from "@/components/ActionButton";
import Booking from "@/interface/Booking";
import { ConvertPaymentStatus } from "@/utils/paymentStatusUtils";
import { thDateString } from "@/utils/thDateConvertor";
import { useRouter } from "next/navigation";
import DataTable, { TableColumn } from "react-data-table-component";

interface BookingDataTableProps {
    data: Booking[];
}

export default function BookingDataTable({ data }: BookingDataTableProps) {
    const router = useRouter();

    const handleView = (id: number) => {
        router.push(`/admin/booking/${id}`)
    }

    const columns: TableColumn<Booking>[] = [
        {
            name: 'อพาทต์เมนต์',
            selector: (row: Booking) => row.room.apartment.name,
            sortable: true,
        },
        {
            name: 'เลขห้อง',
            selector: (row: Booking) => row.room.no,
            sortable: true,
        },
        {
            name: 'วันเริ่มต้น',
            selector: (row: Booking) => thDateString(row.startDate),
            sortable: true,
        },
        {
            name: 'วันหมดสัญญา',
            selector: (row: Booking) => thDateString(row.endDate),
            sortable: true,
        },
        {
            name: 'ระยะเวลา',
            selector: (row: Booking) => row.duration,
            sortable: true,
        },
        {
            name: 'status',
            cell: (row: Booking) => ConvertPaymentStatus(row.payment[0].status),
            sortable: true,
        },
        {
            name: '',
            cell: (row: Booking) => <ActionButton<number> id={row.id!} handleView={handleView} />
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}