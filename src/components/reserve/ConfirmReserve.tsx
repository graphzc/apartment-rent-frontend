'use client'

import useRoom from "@/api/room/useRoom";
import { PaymentStatus } from "@/enum/PaymentStatus";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConfirmReserveForm from "./ConfirmReserveForm";
import Booking from "@/interface/Booking";
import useCreateBooking from "@/api/booking/useCreateBooking";

interface ConfirmReserveProps {
   id: string;
}

export default function ConfirmReserve({ id }: ConfirmReserveProps) {
    const { data: room, isLoading, error } = useRoom(Number.parseInt(id));
    const router = useRouter();

    const { data: user, status } = useSession();

    const mutation = useCreateBooking();

    if (isLoading || status === "loading") {
       return <div>Loading...</div> 
    }

    if (error) {
        router.replace('/reserve');
    }

    if (status === "unauthenticated") {
        router.push('/login');
    }


    const handleSubmit = async (data: Booking) => {
        data.roomId = room!.id!;
        const booking = await mutation.mutateAsync(data);
        if (booking) {
            router.replace('/reserve')
        }
    }

    return (
        <div className="text-xl">
            <div className="mb-4">
                <b>เลขห้อง :</b> { room?.no }
            </div>
            <ConfirmReserveForm user={ user?.user! } room={ room! } onSubmit={ handleSubmit } />
        </div>
    )
}