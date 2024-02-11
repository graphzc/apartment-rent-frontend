'use client'

import { toast } from "react-toastify";
import useApartments from '@/api/apartment/useApartments'
import CreateRoomForm from "@/components/admin/room/CreateRoomForm"
import  SubmitButton from '@/components/SubmitButton';
import Room from "@/interface/Room";
import useCreateRoom from "@/api/room/useCreateRoom";
export default function CreateRoomPage() {
    const { isPending, error, data: apartments } = useApartments();
    const createMutation = useCreateRoom();

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const handleCreate = (data: Room) => {
        createMutation.mutate(data);
        toast.success("Create customer successfully");
    }

    return (
        <div>
             <h1 className="text-xl mb-5">สร้างห้องพัก</h1>
             <div>
                <CreateRoomForm apartments={apartments!} handleCreate={handleCreate}/>
             </div>
        </div>
    );
}