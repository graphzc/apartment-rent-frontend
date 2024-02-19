'use client'

import useDeleteUser from "@/api/user/useDeleteUser";
import ActionButton from "@/components/ActionButton";
import DataTable from "@/components/DataTable";
import User from "@/interface/User";
import { useRouter } from "next/navigation";
import { TableColumn } from "react-data-table-component";

interface UserDataTableProps {
    data: User[];
}

export default function UserDataTable({ data }: UserDataTableProps) {
    const router = useRouter();
    const deleteUser = useDeleteUser();

    // const handleView = (id: string) => {
    //     router.push(`/admin/payment/${id}`)
    // }

    const handleDelete = async (id: string) => {
        const deleted = await deleteUser.mutateAsync(id);

        if (deleted) {
            router.push('/admin/user');
        }
    }

    const columns: TableColumn<User>[] = [
        {
            name: 'ชื่อ',
            selector: (row: User) => row.name!,
            sortable: true,
        },
        {
            name: 'อีเมล',
            selector: (row: User) => row.email!,
            sortable: true,
        },
        {
            name: 'สถานะ',
            selector: (row: User) => row.role!,
            sortable: true,
        },
        {
            name: '',
            cell: (row: User) => <ActionButton<string> id={row.id!} handleDelete={handleDelete}/>
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}