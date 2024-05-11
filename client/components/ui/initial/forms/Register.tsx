'use client'

import { useGlobalError } from "@/components/providers/global-error-provider"
import Input from "@/components/ui/initial/forms/Input"
import { SignupAction } from "@/lib/actions"
import { ResponseMainFormAction } from "@/types"
import { Metadata } from "next"
import Link from "next/link"
import { useState } from "react"
import FormError from "./Error"
import Button from "./Button"
import EyeButton from "./Eye"
import FormMessage from "./FormMessage"
import { useLoading } from "@/components/providers/loading-provider"

export const metadata: Metadata = {
  title: 'Sign Up'
}

export default function RegisterForm() {

  const { setError } = useGlobalError()

  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [state, setState] = useState<ResponseMainFormAction>({
    message: null,
    success: null,
    errors: {}
  })

  const { setIsLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    try {

      setIsLoading(true);

      const rq = await SignupAction(formData);

      setIsLoading(false);

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
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          ariaDescribedBy="name-error"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormError
          id="name-error"
          field="name"
          state={state}
        />
      </div>
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
        
        <EyeButton
          setShowPass={setShowPass}
          showPass={showPass}
        />
      </div>
      
      <Button text={'Sign Up'} />

      <FormMessage state={state} />
    </form>
  )
}