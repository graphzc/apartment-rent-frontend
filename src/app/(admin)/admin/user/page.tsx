'use client'


import useUsers from "@/api/user/useUsers";
import DashboardHeader from "@/components/admin/DashboardHeader";
import UserDataTable from "@/components/admin/user/UserDataTable";
import Link from "next/link";

export default function UserPage() {
    const { data: users, error, isPending } = useUsers();

    if (isPending) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <DashboardHeader text="จัดการผู้ใช้" />
            <UserDataTable data={users} />
        </div>
    )
}