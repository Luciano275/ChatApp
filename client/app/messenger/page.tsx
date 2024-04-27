import { auth, signOut } from "@/auth"

export default async function MessengerPage() {

  const session = await auth();

  return (
    <main>
      <h1>Messenger</h1>
      {JSON.stringify(session?.user)}
      <form action={async () => {
        'use server';
        await signOut({
          redirect: true,
          redirectTo: '/'
        });
      }}>
        <button>Salir</button>
      </form>
    </main>
  )
}