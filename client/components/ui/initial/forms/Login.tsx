"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import EyeButton from "./Eye";
import { useGlobalMessage } from "@/components/providers/global-message-provider";
import { LoginOAuthAction, SignInAction } from "@/lib/actions";
import { ResponseMainFormAction } from "@/types";
import FormError from "./Error";
import FormMessage from "./FormMessage";
import Image from "next/image";

export default function LoginForm() {
  const { setMessage } = useGlobalMessage();

  const [isLoading, setIsLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const [state, setState] = useState<ResponseMainFormAction>({
    message: null,
    success: null,
    errors: {},
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const providerClassName =
    "flex justify-center items-center gap-2 bg-gray-900 rounded-lg py-3 2x:py-4 px-4 hover:bg-gray-800 text-white";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {

      setIsLoading(true);

      const results = await SignInAction(formData);

      setIsLoading(false);

      if (results) {
        setState(results);
      }
    } catch (e) {
      setMessage((e as any).message as string, 'error');
    }
  };

  const onLogin = async (provider: 'google' | 'github') => {
    await LoginOAuthAction(provider)
  }

  return (
    <form
      className="w-full max-w-[450px] mx-auto flex flex-col gap-4 px-4"
      onSubmit={handleSubmit}
    >
      <header className="py-4">
        <h1 className="text-3xl font-bold text-white py-2">Sign In</h1>
        <p className="text-neutral-400">
          Don&apos;t have an account?
          <Link href="/signup" className="text-blue-500 hover:underline">
            {" "}
            Sign up
          </Link>
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

        <FormError id="email-error" field="email" state={state} />
      </div>
      <div className="relative">
        <Input
          type={!showPass ? "password" : "text"}
          placeholder="Password"
          name="password"
          id="password"
          ariaDescribedBy="password-error"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormError id="password-error" field="password" state={state} />

        <EyeButton setShowPass={setShowPass} showPass={showPass} />
      </div>

      <Button text="Sign In" isLoading={isLoading} />

      <FormMessage state={state} />

      <div className="relative py-4 px-10">
        <hr className="border-neutral-700" />
        <span className="absolute w-fit top-1 left-0 right-0 mx-auto bg-gray-950 px-2 text-neutral-300">
          or
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          className={providerClassName}
          type="button"
          onClick={() => onLogin('google')}
        >
          <Image src={"/google.svg"} alt={"Google Logo"} width={28} height={28} />
          Google
        </button>
        <button
          className={providerClassName}
          type="button"
          onClick={() => onLogin('github')}
        >
          <Image src={"/github.svg"} alt={"GitHub Logo"} width={28} height={28} />
          GitHub
        </button>
      </div>
    </form>
  );
}
