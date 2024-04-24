export default function Main({children}: {children: React.ReactNode}) {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-dvh max-h-dvh bg-gray-900 overflow-y-auto animate-fade-in">
      {children}
    </main>
  )
}