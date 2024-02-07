'use client'

import MyReserveList from "@/components/reserve/MyReserveList";

export default function MyReserve() {
    return (
        <div className="container mx-auto">
            <h1 className='text-3xl font-bold my-10 text-black text-center sm:text-left'>
                การจองของฉัน
            </h1>
            <MyReserveList />
        </div>
    )
}