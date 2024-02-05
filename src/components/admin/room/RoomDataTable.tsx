
import { TableColumn } from "react-data-table-component";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import Room from "@/interface/Room";

export default function RoomDataTable({data} : {data: Room[]}){
    const router = useRouter();

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
        }
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}
