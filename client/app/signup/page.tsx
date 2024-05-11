import Container from "@/components/ui/initial/Container"
import Main from "@/components/ui/initial/Main"
import MainImages from "@/components/ui/initial/MainImages"
import RegisterForm from "@/components/ui/initial/forms/Register"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Sign Up'
}

export default function SignUpPage() {
  return (
    <Main>
      <MainImages type="register" />
      <Container>
        <RegisterForm />
      </Container>
    </Main>
  )
}