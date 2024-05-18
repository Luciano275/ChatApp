import Image from "next/image";

export default function MainImages(
  { type }
  : {
    type: 'register' | 'login' | 'confirm' | '404' | 'server'
  }
) {

  const imgSrc = `/assets/${type === 'login' ? 'signin.svg' : type === 'register' ? 'signup.svg' : type === 'confirm' ? 'confirm.svg' : type === '404' ? '404.svg' : 'server.svg'}`

  return (
    <>
      <div className="flex lg:hidden justify-center items-center px-4 py-8">
        <Image
          src={imgSrc}
          alt='Sign in image'
          width={200}
          height={200}
          priority
        />
      </div>
      <div className="hidden lg:flex justify-center items-center px-4">
        <Image
          src={imgSrc}
          alt='Sign in image'
          width={500}
          height={500}
          priority
        />
      </div>
    </>
  )
}