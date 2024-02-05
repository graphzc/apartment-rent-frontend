'use client'

import useRooms from "@/api/room/useRooms";
import DashboardHeader from "@/components/admin/DashboardHeader";
import RoomDataTable from "@/components/admin/room/RoomDataTable";

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
            <RoomDataTable data={rooms!} />
        </div>
    )
}