import Footer from "@/components/ui/Footer"
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
      <div className="flex flex-1 flex-col justify-center bg-gray-950">
        <RegisterForm />
        <Footer />
      </div>
    </Main>
  )
}