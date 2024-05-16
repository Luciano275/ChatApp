import { auth } from "@/auth";
import { getProfilePhotoAction } from "@/lib/s3";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "./Back";

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

    const profilePhoto = await getProfilePhotoAction(user?.image || 'default.png');

    return (
        <header className={`bg-gray-950 px-2 py-4 rounded-xl flex items-center gap-2 ${className}`}>
          <div className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] rounded-full overflow-hidden">
            <Link href="/messenger/photo">
              <img
                src={profilePhoto.success?.url}
                alt={"Photo"}
                className="w-full max-w-full h-full max-h-full object-cover"
              />
            </Link>
          </div>
          <h1 className="text-lg sm:text-xl text-white grow">{user?.name}</h1>
          
          <BackButton />
        </header>
    )
}