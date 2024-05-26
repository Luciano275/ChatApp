import Header from "@/components/ui/messenger/Header";
import { ContainerMessages } from "@/components/ui/messenger/containers";
import AddFriendForm from "@/components/ui/messenger/friend/FriendForm";

export default function AddFriendPage() {
    return (
        <ContainerMessages className="flex-col">
            <Header className="md:hidden" />
            <section className="flex flex-col gap-4 px-2 py-4 md:py-8">
                <h2 className="text-center text-xl md:text-4xl pb-4 px-2 text-white">Add Friend</h2>
                
                <AddFriendForm />
            </section>
        </ContainerMessages>
    )
}