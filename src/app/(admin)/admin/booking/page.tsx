'use client'

import useBookings from "@/api/booking/useBookings";
import DashboardHeader from "@/components/admin/DashboardHeader";
import BookingDataTable from "@/components/admin/booking/BookingDataTable";

export default function BookingAdmin() {
    const { data: bookings, isPending, error } = useBookings();

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <DashboardHeader text="จัดการการเช่า" />
            <BookingDataTable data={bookings} />
        </div>
    ) 
}