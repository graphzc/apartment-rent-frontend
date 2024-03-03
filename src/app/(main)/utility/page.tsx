'use client'

import useMyBooking from "@/api/booking/useMyBooking";
import { thDateString } from "@/utils/thDateConvertor";
import Link from "next/link";

export default function Utility() {
	const { data: reserves, isLoading, error } = useMyBooking();
	
	return (
		<div>
			<div className="w-100 relative text-center">
				<img src="/homeAsset/2.jpg" className="object-cover h-96 w-screen " />
				<div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
					<div className="text-5xl font-bold text-white mt-36">สาธารณูปโภค</div>
				</div>
			</div>
			<div className="container mx-auto mb-44">
				<div className="text-3xl font-bold my-10 text-black text-center sm:text-left">
					เช็คค่าน้ำ/ค่าไฟ
				</div>
				{/* List my booking */}
				{reserves?.map((reserve) => (
					<Link 
						href={`/utility/check/${reserve.id}`}
						className="mt-2 border border-gray-400 px-4 py-2 rounded-lg text-left block w-full transition hover:border-black" 
						key={reserve.id}
					>
						<div><b>ห้อง</b> {reserve.room.no}</div>
						<div><b>ระยะเวลา</b> { thDateString(reserve.startDate) } -  { thDateString(reserve.endDate) }</div>
					</Link>
				))}
				

			</div>
		</div>
	)
}