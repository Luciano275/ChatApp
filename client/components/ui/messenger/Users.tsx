import { ContainerUsers } from "./containers";
import { signOut } from "@/auth";
import { GoSignOut } from "react-icons/go";
import Header from "./Header";
import AddFriendButton from "./AddFriend";
import scrollBarStyles from '@/styles/scrollbar.module.css'

export default function Users() {
    return (
    <ContainerUsers>
        
        <Header />

        <div className="grow py-4 flex flex-col gap-4 overflow-hidden">
          
          <AddFriendButton />

          <div className={`grow rounded-xl flex flex-col gap-4 overflow-y-auto ${scrollBarStyles['custom-scrollbar']}`}>
            
          </div>

        </div>
        <form action={async () => {
          'use server'
          await signOut({
            redirect: true,
            redirectTo: '/'
          });
        }}>
          <button className="text-white p-2 bg-gray-950 w-full rounded-xl flex items-center justify-center gap-2 hover:bg-red-600">
            <GoSignOut size={25} />
            Sign Out
          </button>
        </form>
      </ContainerUsers>
    )
}