'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "./Input";

export default function LoginForm() {

  const [showPass, setShowPass] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const providerClassName = 'flex justify-center items-center gap-2 bg-gray-900 rounded-lg p-4 hover:bg-gray-800 text-white'

  return (
    <form className="w-full max-w-[450px] mx-auto flex flex-col gap-4 px-4">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-white py-2">Sign In</h1>
        <p className="text-neutral-400">
          Don&apos;t have an account?
          <Link href='/signup' className="text-blue-500 hover:underline"> Sign up</Link>
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
        <span
          className="absolute text-violet-600 right-3 top-5 cursor-pointer hover:text-violet-400"
          onClick={() => setShowPass((prev) => !prev)}
        >
         { !showPass ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
        </span>
      </div>
      <button
        className="w-full p-4 rounded-xl bg-violet-500 text-white font-bold text-lg hover:bg-violet-600"
      >Sign in</button>
      <div className="relative py-4 px-10">
        <hr className="border-neutral-700" />
        <span className="absolute w-fit top-1 left-0 right-0 mx-auto bg-gray-950 px-2 text-neutral-300">or</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className={providerClassName} type="button">
          <Image
            src={'/google.svg'}
            alt={'Google Logo'}
            width={28}
            height={28}
          />
          Google
        </button>
        <button className={providerClassName} type="button">
          <Image
            src={'/github.svg'}
            alt={'GitHub Logo'}
            width={28}
            height={28}
          />
          GitHub
        </button>
      </div>
    </form>
  )
}