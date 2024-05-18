import { auth } from "@/auth";
import Header from "@/components/ui/messenger/Header";
import { ContainerMessages } from "@/components/ui/messenger/containers";
import { getProviderByEmail } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function ProfilePhotoPage() {

    const session = await auth();

    if (!session) {
        notFound();
    }

    const provider = await getProviderByEmail(session.user?.email!)

    if (provider?.accounts.length) {
        notFound();
    }

    return (
        <ContainerMessages className="flex-col">
            <Header className="md:hidden" />
            <section className="flex flex-col items-center gap-4 px-2 py-4">
                
            </section>
        </ContainerMessages>
    )
}