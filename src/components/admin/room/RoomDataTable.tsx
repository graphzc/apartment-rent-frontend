'use client'

import { TableColumn } from "react-data-table-component";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import Room from "@/interface/Room";
import ActionButton from "@/components/ActionButton";
import useDeleteRoom from "@/api/room/useDeleteRoom";

export default function RoomDataTable({data} : {data: Room[]}){
    const router = useRouter();

    const deleteMutation = useDeleteRoom();

    const handleDelete = async (id: number) => {
        await deleteMutation.mutateAsync(id);
        if(deleteMutation.isSuccess){
            router.push('/admin/room')
        }
    }

    const handleEdit = (id: number) => {
        router.push(`/admin/room/edit/${id}`)
    }
    const handleView = (id: number) => {
        router.push(`/admin/room/${id}`)
    }

    const columns: TableColumn<Room>[] = [
        {
            name: 'ID',
            selector: (row: Room) => row.id!,
            sortable: true,
        },
        {
            name: 'เลขห้อง',
            selector: (row: Room) => row.no!,
            sortable: true,
        },
        {
            name: 'อพาร์ทเม้นท์',
            selector: (row: Room) => row.apartment!.name!,
            sortable: true,
        },
        {
            name: '',
            cell: (row: Room) => <ActionButton<number> id={row.id!} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
        },
    ];
    return(
        <DataTable
            columns={columns}
            data={data}
        />
    )
}
