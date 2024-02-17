'use client';

import { PaymentStatus } from "@/enum/PaymentStatus";
import Apartment from "@/interface/Apartment";
import Room from "@/interface/Room";
import { HomeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface ReserveCardProps {
    room: Room;
    apartment: Apartment;
    reserveFunction: (apartment: Apartment, room: Room) => void;
}
export default function ReserveCard({ apartment, room, reserveFunction }: ReserveCardProps) {
    const isAvaliable = room.booking.length > 0 && room.booking[0].endDate < new Date() && room.booking[0].payment.length > 0 && room.booking[0].payment[0].status !== PaymentStatus.UNPAID || room.booking.length == 0;
    
    return (
        <>
            { isAvaliable ?
                <button
                    className='rounded overflow-hidden shadow-xl mb-2 bg-gray-100 transition hover:duration-300 hover:scale-105 text-gray-800'
                    onClick={() => reserveFunction(apartment, room)}
                >
                    <div className="px-6 py-4 text-center ">
                        <div className="flex justify-center items-center">
                        <HomeIcon className="h-6 w-6 " />
                        </div>
                        <div className="font-bold text-xl my-3">{room.no}</div>
                        <p className=" text-base">
                            ห้องว่าง
                        </p>
                    </div>
                </button>
            :
                <button
                    className='rounded overflow-hidden shadow-xl mb-2 bg-red-100 transition text-red-800 cursor-auto'
                >
                    <div className="px-6 py-4 text-center ">
                        <div className="flex justify-center items-center">
                        <ExclamationTriangleIcon className="h-6 w-6 " />
                        </div>
                        <div className="font-bold text-xl my-3">{room.no}</div>
                        <p className=" text-base">
                            ห้องไม่ว่าง
                        </p>
                    </div>
                </button>
            }
        </>
    )
}