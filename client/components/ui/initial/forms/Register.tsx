'use client'

import { useGlobalError } from "@/components/providers/global-error-provider"
import Input from "@/components/ui/initial/forms/Input"
import { SignupAction } from "@/lib/actions"
import { ResponseMainFormAction } from "@/types"
import { Metadata } from "next"
import Link from "next/link"
import { useState } from "react"
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa"
import FormError from "./Error"
import { BiErrorCircle } from "react-icons/bi"

export const metadata: Metadata = {
  title: 'Sign Up'
}

export default function RegisterForm() {

  const { setError } = useGlobalError()

  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [state, setState] = useState<ResponseMainFormAction>({
    message: null,
    success: null,
    errors: {}
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const rq = await SignupAction(formData);

      setState(rq);
    } catch (e) {
      setError((e as any).message as string);
    }
  }

  return (
    <form className="w-full max-w-[450px] mx-auto flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
      <header className="py-4">
        <h1 className="text-3xl font-bold text-white py-2">Sign Up</h1>
        <p className="text-neutral-400">
          Do you have an account?
          <Link href='/' className="text-blue-500 hover:underline"> Sign In</Link>
        </p>
      </header>
      <div>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          ariaDescribedBy="email-error"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormError
          id="email-error"
          field="email"
          state={state}
        />
      </div>
      <div className="relative">
        <Input
          type={!showPass ? 'password' : 'text'}
          placeholder="Password"
          name="password"
          id="password"
          ariaDescribedBy="password-error"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormError
          id="password-error"
          field="password"
          state={state}
        />
        <span
          className="absolute text-violet-600 right-3 top-5 cursor-pointer hover:text-violet-400"
          onClick={() => setShowPass((prev) => !prev)}
        >
          {!showPass ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
        </span>
      </div>
      <button
        className="w-full p-4 rounded-xl bg-violet-500 text-white font-bold text-lg hover:bg-violet-600"
      >Sign Up</button>

      {
        state.message && (
          <p className={`p-2 text-white rounded-lg ${state.success ? 'bg-green-600' : 'bg-red-600'} bg-opacity-80 flex gap-2 justify-center items-center`}>
            {state.success ? <FaCheckCircle size={20} /> : <BiErrorCircle size={20} />}
            {state.message}
          </p>
        )
      }
    </form>
  )
}