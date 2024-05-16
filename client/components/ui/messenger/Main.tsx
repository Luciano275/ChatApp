export default function Main(
    {children}:
    {
        children: React.ReactNode
    }
) {
    return (
        <main className={`bg-gray-900 min-h-dvh max-h-dvh flex gap-4 p-4`}>
            {children}
        </main>
    )
}