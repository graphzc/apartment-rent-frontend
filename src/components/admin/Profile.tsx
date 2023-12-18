interface ProfileProps {
    name?: string;
}

export default function Profile({ name }: ProfileProps) {
    return (
        <div className='text-center border border-gray-200 rounded-lg px-2 py-1'>
            <div>สวัสดี </div>
            <h1><span className='font-normal'>{ name }</span></h1>
        </div>
    )
}