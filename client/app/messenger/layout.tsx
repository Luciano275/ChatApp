import Main from "@/components/ui/messenger/Main";
import Users from "@/components/ui/messenger/Users";

export default function MessengerLayout({children}: {children: React.ReactNode}) {
    return (
        <Main>
            <Users />
            {children}
        </Main>
    )
}