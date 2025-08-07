'use client'

import ConfirmReserve from '@/components/reserve/ConfirmReserve';
import { useParams } from 'next/navigation';

export default function ReserveConfrim() {
    const { id } = useParams<{ id: string }>();
    
    return (
        <div className='container mx-auto mt-5'>
            <h1 className='text-3xl font-bold my-10 text-black text-center sm:text-left'>
                ยืนยันการจองห้องพัก
            </h1>

            <div>
                <ConfirmReserve id={ id } />
            </div>
        </div>
    )
}