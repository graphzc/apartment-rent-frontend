import useMyBooking from "@/api/booking/useMyBooking";
import Link from "next/link";

export default function MyReserveList() {
    const { data: reserves, isLoading, error } = useMyBooking();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            {reserves?.map((reserve) => (
                <Link href={`/my-reserve/${reserve.id}`} className="mt-2 border border-gray-400 px-4 py-2 rounded-lg text-left block w-full transition hover:border-black" key={reserve.id}>
                    <div><b>ห้อง</b> {reserve.room.no}</div>
                    <div><b>ระยะเวลา</b> { new Date(reserve.startDate).toDateString() } -  { new Date(reserve.endDate).toDateString() }</div>
                </Link>
            ))}
        </div>
    )
}