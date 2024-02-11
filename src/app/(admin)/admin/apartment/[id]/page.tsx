'use client'

import { toast } from "react-toastify";
import  EditApartmentForm from '@/components/admin/apartment/EditApartmentForm';
import  SubmitButton from '@/components/SubmitButton';
import Apartment from "@/interface/Apartment";
import { useRouter } from "next/navigation";
import useApartment from "@/api/apartment/useApartment";
import BackButton from "@/components/BackButton";
import Link from "next/link";
export default function ViewApartmentPage({params} : {params: {id: string}}) {
    const router = useRouter();
    
    const {isPending, error, data: apartment} = useApartment(parseInt(params.id));

    if (isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    return (
        <div>
            <BackButton href="/admin/apartment" />
            <h1 className="text-xl mb-5">ดูข้อมูลอพาร์ทเม้นท์</h1>
            <div>
                <div><span className="font-medium">ชื่อ</span> : {apartment.name}</div>
                <div><span className="font-medium">ห้อง</span> : </div>
                { apartment.room.map((room) => (
                    <Link key={room.id} href={ `/admin/room/${room.id}` } className="py-2 px-3 bg-white mb-2 border border-gray-400 hover:border-gray-700 rounded-lg block">
                        <div><span className="font-medium">เลขห้อง</span> : {room.no}</div>
                        <div><span className="font-medium">ราคา</span> : {room.price}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}