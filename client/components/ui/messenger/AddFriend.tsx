import Link from "next/link";
import { CgAdd } from "react-icons/cg";

export default function AddFriendButton() {
    return (
      <Link
        href="/messenger/friend"
        className="flex items-center justify-start gap-2 bg-gray-950 text-neutral-300 w-full rounded-xl py-3 px-2 hover:bg-green-800"
      >
        <CgAdd size={25} />
        <span className="grow text-start">Add Friend</span>
      </Link>
    );
}