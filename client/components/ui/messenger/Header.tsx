import { auth } from "@/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "./Back";
import { IoNotifications } from "react-icons/io5";

export default async function Header(
    {className}
    : {
        className?: string;
    }
) {

    const session = await auth();

    if (!session) {
        notFound();
    }

    const { user } = session;

    return (
        <header className={`bg-gray-950 px-2 py-4 rounded-xl flex items-center gap-2 ${className} justify-between md:justify-normal`}>
          <div className="max-w-[50px] min-w-[50px] h-[50px] rounded-full overflow-hidden">
            <Link href="/messenger/photo">
              <img
                src={session.user?.image!}
                alt={"Photo"}
                className="w-full max-w-full h-full max-h-full object-cover object-center hover:contrast-50"
                style={{
                  transition: 'filter 250ms ease'
                }}
              />
            </Link>
          </div>
          <h1 className="hidden md:block text-lg sm:text-xl text-white grow whitespace-nowrap text-nowrap overflow-hidden text-ellipsis">{user?.name}</h1>

          <div className="flex gap-5 items-center">
            <div className="indicator">
              <span className="indicator-item badge badge-error badge-xs"></span>
              <Link href={'/messenger/notifies'} className="text-neutral-300 hover:text-white">
                <IoNotifications size={25} />
              </Link>
            </div>

            <BackButton />
          </div>
        </header>
    )
}