'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsArrowLeftCircle } from "react-icons/bs";
import { HOME_PATH } from "./containers";

export default function BackButton() {

    const pathname = usePathname();
    
    if (HOME_PATH !== pathname) {
        return (
            <Link href="/messenger" className="text-blue-400">
                <BsArrowLeftCircle size={25} />
            </Link>
        )
    }
}