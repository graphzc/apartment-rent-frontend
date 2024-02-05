export default function DashboardHeader({ text } : { text: string }) {
    return (
        <h1 className="text-xl mb-4">{ text }</h1>
    )
}