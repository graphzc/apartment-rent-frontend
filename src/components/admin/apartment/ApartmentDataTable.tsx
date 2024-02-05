
import { TableColumn } from "react-data-table-component";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import Apartment from "@/interface/Apartment";

export default function ApartmentDataTable({data} : {data: Apartment[]}){
    const router = useRouter();

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
            name: ''
        }
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}
