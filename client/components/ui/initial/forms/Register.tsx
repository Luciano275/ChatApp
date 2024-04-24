'use client'

import Input from "@/components/ui/initial/forms/Input"
import { Metadata } from "next"
import Link from "next/link"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export const metadata: Metadata = {
  title: 'Sign Up'
}

export default function RegisterForm() {

  const [showPass, setShowPass] = useState(false);

  return (
    <form className="w-full max-w-[450px] mx-auto flex flex-col gap-4 px-4">
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
        />
      </div>
      <div className="relative">
        <Input
          type={!showPass ? 'password' : 'text'}
          placeholder="Password"
          name="password"
          id="password"
          ariaDescribedBy="password-error"
        />
        <span
          className="absolute text-violet-600 right-3 top-5 cursor-pointer hover:text-violet-400"
          onClick={() => setShowPass((prev) => !prev)}
        >
         { !showPass ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
        </span>
      </div>
      <button
        className="w-full p-4 rounded-xl bg-violet-500 text-white font-bold text-lg hover:bg-violet-600"
      >Sign Up</button>
    </form>
  )
}