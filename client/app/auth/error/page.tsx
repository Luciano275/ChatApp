import BackButton from "@/components/BackButton";
import Container from "@/components/ui/initial/Container";
import Main from "@/components/ui/initial/Main";
import MainImages from "@/components/ui/initial/MainImages";

export default function AuthError() {
  return (
    <Main>
      <MainImages type="server" />
      <Container>
        <h1 className="text-5xl font-bold text-blue-400 text-center p-2">
          Auth Error
        </h1>
        <p className="text-neutral-300 text-center p-2">
          There was a problem when trying to authenticate
        </p>
        <BackButton />
      </Container>
    </Main>
  );
}