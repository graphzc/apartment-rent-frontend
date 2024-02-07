import DT, { TableColumn } from "react-data-table-component";

interface DataTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
}

export default function DataTable<T>({
    data,
    columns,
}: DataTableProps<T>) {
    return (
        <DT 
            data={data}
            columns={columns}
            pagination
            highlightOnHover
            striped
            responsive 

        />
    )
}