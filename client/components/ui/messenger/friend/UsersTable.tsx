import React from 'react';
import { fetchUsersByQuery } from '@/lib/data';
import UsersTable from './Table';

export default async function SearchUsersTable({query, id}: {query: string | undefined, id: string}) {

    const users = query ? await fetchUsersByQuery(query, id) : undefined

    return (
        <React.Fragment>
            {/* Desktop Form */}
            <UsersTable users={users} />

        </React.Fragment>
    )
}