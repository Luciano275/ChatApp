import Container from "@/components/ui/initial/Container";
import Main from "@/components/ui/initial/Main";
import MainImages from "@/components/ui/initial/MainImages";
import LoginForm from "@/components/ui/initial/forms/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign In'
}

export default function Home() {
  return (
    <Main>
      <MainImages type="login" />
      <Container>
        <LoginForm />
      </Container>
    </Main>
  );
}
