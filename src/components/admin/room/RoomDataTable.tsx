
import { TableColumn } from "react-data-table-component";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import Room from "@/interface/Room";
import ActionButton from "@/components/ActionButton";

export default function RoomDataTable({data} : {data: Room[]}){
    const router = useRouter();
    const handleDelete = (id: string) => {
        router.push(`/admin/room/${id}`)
    }
    const handleEdit = (id: string) => {
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
            cell: (row: Room) => <ActionButton id={row.id!} handleDelete={handleDelete} handleEdit={handleEdit}/>
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}
