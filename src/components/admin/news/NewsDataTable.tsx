
import { TableColumn } from "react-data-table-component";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import News from "@/interface/News";
import ActionButton from "@/components/ActionButton"
import useDeleteNews from "@/api/news/useDeleteNews";


export default function NewsDataTable({data} : {data: News[]}){
    const router = useRouter();
    const deleteNews = useDeleteNews();
    const handleDelete = async (id: number) => {
        const deleted = await deleteNews.mutateAsync(id);
    }
    const handleEdit = (id: number) => {
        router.push(`/admin/news/edit/${id}`)
    }
    const handleView = (id: number) => {
        router.push(`/admin/news/${id}`)
    }

    const columns: TableColumn<News>[] = [
        {
            name: 'ID',
            selector: (row: News) => row.id!,
            sortable: true,
        },
        {
            name: 'หัวข้อ',
            selector: (row: News) => row.title!,
            sortable: true,
        },
        {
            name: 'เนื้อหา',
            selector: (row: News) => row.content!,
            allowOverflow: false,
            sortable: true,
        },
        {
            name: 'วันสิ้นสุด',
            cell: (row: News) => <div>{new Date(row.endDate!).toLocaleDateString()}</div>,
            sortable: true,
        },
        {
            name: 'สถานะ',
            cell: (row: News) => <div>{new Date(row.endDate!) > new Date() ? <span className="text-green-500">ไม่หมดอายุ</span> : <span className="text-red-500">หมดอายุ</span>}</div>,

        },
        {
            name: '',
            cell: (row: News) => <ActionButton<number> id={row.id!} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}
