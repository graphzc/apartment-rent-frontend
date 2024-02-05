'use client'
import useApartments from "@/api/apartment/useApartments";
import DashboardHeader from "@/components/admin/DashboardHeader";
import ApartmentDataTable from "@/components/admin/apartment/ApartmentDataTable";

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
            <ApartmentDataTable data={apartments!} />
        </div>
    )
}