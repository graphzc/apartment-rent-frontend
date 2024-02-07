
import { TableColumn } from "react-data-table-component";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import Apartment from "@/interface/Apartment";
import ActionButton from "@/components/ActionButton"


export default function ApartmentDataTable({data} : {data: Apartment[]}){
    const router = useRouter();
    const handleDelete = (id: number) => {
        router.push(`/admin/apartment/${id}`)
    }
    const handleEdit = (id: number) => {
        router.push(`/admin/apartment/${id}`)
    }
    const handleView = (id: number) => {
        router.push(`/admin/apartment/${id}`)
    }

    const columns: TableColumn<Apartment>[] = [
        {
            name: 'ID',
            selector: (row: Apartment) => row.id!,
            sortable: true,
        },
        {
            name: 'ชื่อ',
            selector: (row: Apartment) => row.name!,
            sortable: true,
        },
        {
            name: '',
            cell: (row: Apartment) => <ActionButton<number> id={row.id!} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}
