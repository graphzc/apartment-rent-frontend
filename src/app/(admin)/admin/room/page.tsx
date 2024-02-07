'use client'

import useRooms from "@/api/room/useRooms";
import DashboardHeader from "@/components/admin/DashboardHeader";
import RoomDataTable from "@/components/admin/room/RoomDataTable";
import Link from "next/link";

export default function RoomPage() {
    const { data: rooms, error, isLoading } = useRooms();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <DashboardHeader text="จัดการห้อง" />
            <div className="flex justify-end">
                <Link href="/admin/room/create" className="bg-blue-500 text-white px-3 py-2 rounded-lg mb-2">สร้างห้อง</Link>
            </div>
            <RoomDataTable data={rooms!} />
        </div>
    )
}