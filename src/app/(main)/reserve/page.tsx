"use client"

import Apartment from "@/interface/Apartment";
import {
	Fragment,
	useRef,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Room from "@/interface/Room";
import ReserveRoomList from "@/components/reserve/RoomList";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Reserve() {
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);
	const cancelButtonRef = useRef(null);
	const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

	const reserve = (apartment: Apartment, room: Room) => {
		room.apartment = apartment;
		setCurrentRoom(room);
		setOpen(true);
	};

	const confirm = () => {
		router.push(`/reserve/confirm/${currentRoom?.id}`)
		setCurrentRoom(null);
		setOpen(false);
	};

	const Modal = () => {
		return (
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					initialFocus={cancelButtonRef}
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
												<Dialog.Title
													as="h3"
													className="text-xl font-bold leading-6 text-gray-900"
												>
													ยืนยันการจองห้องพัก
												</Dialog.Title>
												<div className="mt-2">
													<p className="text-lg text-black">
														อพาทเมนต์: {currentRoom?.apartment?.name}<br />
														ห้อง: {currentRoom?.no}
													</p>
													<p className="text-lg text-gray-500">
														หากต้องการจองห้องพัก จะต้องชำระเงินภายใน 1 วัน
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
										<button
											type="button"
											className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
											onClick={(e) => {
												confirm();
											}}
										>
											จองห้องพัก
										</button>
										<button
											type="button"
											className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
											onClick={() => setOpen(false)}
											ref={cancelButtonRef}
										>
											ยกเลิก
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		);
	};

	return (
		<>
			<Modal />
			<div className="w-100 relative text-center">
				<img src="/homeAsset/2.jpg" className="object-cover h-96 w-screen " />
				<div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
					<div className="text-5xl font-bold text-white mt-36">จองห้องพัก</div>
				</div>
			</div>
			<div className="container mx-auto mb-44">
				<div className="text-3xl font-bold my-10 text-black text-center sm:text-left">
					ห้องพักทั้งหมด
				</div>
				<div className="flex justify-end">
					<Link href="/my-reserve/" className="bg-blue-500 text-white px-3 py-1 rounded-lg">
						การจองของฉัน
					</Link>
				</div>
				<ReserveRoomList reserveFunction={reserve} />
			</div>
		</>
	);
}
