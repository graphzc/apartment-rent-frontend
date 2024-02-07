'use client'
import useApartments from "@/api/apartment/useApartments";
import DashboardHeader from "@/components/admin/DashboardHeader";
import ApartmentDataTable from "@/components/admin/apartment/ApartmentDataTable";
import Link from "next/link";

export default function ApartmentPage() {
    const { data: apartments, error, isLoading } = useApartments();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <DashboardHeader text="จัดการอพาร์ทเม้นท์" />
            <div className="flex justify-end">
                <Link href="/admin/apartment/create" className="bg-blue-500 text-white px-3 py-2 rounded-lg mb-2">สร้างอพาร์ทเม้นท์</Link>
            </div>
            <ApartmentDataTable data={apartments!} />
        </div>
    )
}