import Navbar from "@/components/admin/Navbar"

export const metadata = {
  title: 'House for Rent Admin',
  description: 'House for Rent Admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-100 min-h-screen">
        <div className="grid grid-cols-6 gap-2">
            <Navbar />
            <div className="p-4 pr-6 w-full col-span-5">
                {children}
            </div>
        </div>
    </div>
  )
}
