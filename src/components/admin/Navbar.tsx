'use client'

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Profile from './Profile';
// import Logo from 'public/imgs/poolworld-logo.png';

interface NavbarItemProps {
    href: string;
    text: string;
    currentPath: string;
}

function NavbarItem({ href, text, currentPath } : NavbarItemProps) {
    const isActive = currentPath.includes(href);
    return (
        <div className="w-full">
            <Link
                href={href}
                className={ `block w-full py-2 px-4 mb-2 ${isActive && 'font-medium bg-gray-100'} text-gray-700 rounded-lg hover:bg-gray-100` }
            >
                { text }
            </Link>
        </div>
    )
}


export default function Navbar() {
    const { data: session, status } = useSession();
    
    const pathname = usePathname();
    const router = useRouter();

    return (
        <nav className='bg-white h-screen border-r py-5 px-3 border-gray-200 sticky top-0 col-span-1 self-start'>
            <div className='font-bold text-center text-lg pb-3 flex justify-center gap-2'>
                {/* <Image 
                    src={Logo}
                    width={30}
                    height={30}
                    alt='Poolworld'
                /> */}
                <div>
                    ซ้งศรีเจริญ
                </div>
            </div>
            <div className='mb-3'>
                <Profile name={session?.user?.name} />
            </div>
            <div className='flex flex-col justify-between'>
                <div>
                    <NavbarItem href="/dashboard" text="แดชบอร์ด" currentPath={pathname} />
                    {/* { session?.user?.role === EmployeeRole.ADMIN && <NavbarItem href="/employee" text="พนักงาน" currentPath={pathname} />} */}
                    
                    <NavbarItem href="#" text="ลูกค้า" currentPath={pathname} />
                    <NavbarItem href="#" text="อพาทเมนต์" currentPath={pathname} />
                    <NavbarItem href="#" text="ห้อง" currentPath={pathname} />
                    <NavbarItem href="#" text="การเช่า" currentPath={pathname} />
                </div>
                <div className="w-full">
                    <button
                        className="block w-full text-left py-2 px-4 mb-2 rounded-lg text-white hover:bg-red-500 bg-red-600"
                        onClick={async () => {
                            await signOut()
                            router.replace('/home')
                        }}
                    >
                        ออกจากระบบ
                    </button>
                </div>
            </div>

        </nav>
    )
}