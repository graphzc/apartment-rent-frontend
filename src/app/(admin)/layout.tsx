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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
