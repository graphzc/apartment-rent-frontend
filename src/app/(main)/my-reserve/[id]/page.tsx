'use client'

import ReserveInfo from "@/components/reserve/ReserveInfo";
import { useParams } from "next/navigation";

export default function MyReserveInfo() {
    const { id } = useParams<{ id: string }>();
    
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-10 text-black text-center sm:text-left">
                รายละเอียดการจองห้องพัก
            </h1>

            <ReserveInfo id={parseInt(id)} />
        </div>
    );
}