import React from 'react';
import { fetchUsersByQuery } from '@/lib/data';
import UsersTable from './Table';
import MobileUsersForm from './Mobile';

export default async function SearchUsersTable({query, id}: {query: string | undefined, id: string}) {

    const users = query ? await fetchUsersByQuery(query, id) : undefined

    if (!users) {
        return (
            <h2 className="text-center text-white py-4">Search some user</h2>
        )
    }

    return (
        <React.Fragment>
            {/* Desktop Form */}
            <UsersTable users={users} />

            {/* Mobile Form */}
            <MobileUsersForm users={users} />
        </React.Fragment>
    )
}