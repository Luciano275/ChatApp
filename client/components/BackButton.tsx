import Link from "next/link";

export default function BackButton() {
    return (
        <Link href="/" className="w-fit bg-gray-800 text-white py-2 px-5 rounded-full hover:bg-gray-700 mx-auto">Back</Link>
    )
}