import BackButton from "@/components/BackButton";
import Container from "@/components/ui/initial/Container";
import Main from "@/components/ui/initial/Main";
import MainImages from "@/components/ui/initial/MainImages";

export default function NotFoundPage() {
    return (
        <Main>
            <MainImages type="404" />
            <Container>
                <h1 className="text-5xl font-bold text-blue-400 text-center p-2">404</h1>
                <h2 className="text-3xl font-bold text-gray-100 text-center p-2">Page Not Found</h2>
                <BackButton />
            </Container>
        </Main>
    )
}