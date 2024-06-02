'use client';

import { FaSearch } from "react-icons/fa";
import inputStyles from '@/styles/search.module.css'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce'

export default function AddFriendForm() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const defaultSearch = searchParams.get('search');

    const DEBOUNCE_TIME = 300

    const handleSearch = useDebouncedCallback((search: string) => {
        const params = new URLSearchParams(searchParams);

        if (search) {
            params.set('search', search);
        }else {
            params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`)
    }, DEBOUNCE_TIME)

    return (
        <form className="flex flex-col gap-4 px-2">
            <div className="relative" id={inputStyles.containerSearch}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="py-2 pl-8 pr-2 w-full outline-none bg-gray-900 rounded-xl border border-transparent focus:border-blue-500 text-white"
                    placeholder="Name or email of the user"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={defaultSearch || ''}
                />
                <span className="text-neutral-400 absolute w-fit h-full flex justify-center items-center top-0 left-2">
                    <FaSearch size={17} />
                </span>
            </div>
        </form>
    )
}