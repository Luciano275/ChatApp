import Container from "@/components/ui/initial/Container";
import Main from "@/components/ui/initial/Main";
import MainImages from "@/components/ui/initial/MainImages";
import NewVerification from "@/components/ui/initial/verification/NewVerification";

export default async function NewVerificationEmail() {
  return (
    <Main>
      <MainImages type="confirm" />
      <Container>
        <NewVerification />
      </Container>
    </Main>
  )
}