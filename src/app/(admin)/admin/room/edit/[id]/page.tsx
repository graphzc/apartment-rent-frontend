'use client'

import useApartments from '@/api/apartment/useApartments';
import useRoom from '@/api/room/useRoom';
import useUpdateRoom from '@/api/room/useUpdateRoom';
import  EditRoomForm from '@/components/admin/room/EditRoomForm';
import BackButton from "@/components/BackButton";
import Room from '@/interface/Room';
import { useRouter } from 'next/navigation';
export default function CreateCustomerPage({params} : {params: { id: string }}) {
    const router = useRouter();
    const { isPending: isPendingApartment, error: errorApartment, data: apartments } = useApartments();
    const { isPending: isPendingRoom, error: errorRoom, data: room } = useRoom(parseInt(params.id));
    const updateRoom = useUpdateRoom();
    if (isPendingRoom || isPendingApartment) {
        return <div>Loading...</div>;
    }

    if (errorApartment) {
        return <div>{errorApartment?.message}</div>;
    }

    if (errorRoom) {
        return <div>{errorRoom?.message}</div>;
    }

    const handleUpdate = async (data: Room) => {
        const updated = await updateRoom.mutateAsync(data);

        if (updated) {
            router.push('/admin/room');
        }
    }


    return (

        <div>
            <BackButton href="/admin/room" />
            <h1 className="text-xl mb-5">แก้ไขห้องพัก</h1>
            <EditRoomForm apartments={apartments!} room={room} handleUpdate={handleUpdate} />
        </div>
    );
}