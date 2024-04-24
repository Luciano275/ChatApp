import Image from "next/image";

export default function MainImages() {
  return (
    <>
      <div className="flex lg:hidden justify-center items-center px-4 py-8">
        <Image
          src={'/signin.svg'}
          alt='Sign in image'
          width={200}
          height={200}
        />
      </div>
      <div className="hidden lg:flex justify-center items-center px-4">
        <Image
          src={'/signin.svg'}
          alt='Sign in image'
          width={500}
          height={500}
        />
      </div>
    </>
  )
}