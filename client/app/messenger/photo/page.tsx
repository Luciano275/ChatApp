import { auth } from "@/auth";
import Header from "@/components/ui/messenger/Header";
import { ContainerMessages } from "@/components/ui/messenger/containers";
import ProfilePhotoForm from "@/components/ui/messenger/photo/Form";
import { getProviderByEmail } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Profile Photo'
}

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
            <section className="flex flex-col items-center gap-4 px-2 py-4 md:py-8">
                <h2 className="text-4xl pb-4 px-2 text-white">Profile</h2>
                
                <ProfilePhotoForm profilePhoto={session.user?.image!} email={session.user?.email!} />
            </section>
        </ContainerMessages>
    )
}