import { auth } from "@/auth";
import Header from "@/components/ui/messenger/Header";
import { ContainerMessages } from "@/components/ui/messenger/containers";
import AddFriendForm from "@/components/ui/messenger/friend/FriendForm";
import SearchUsersTable from "@/components/ui/messenger/friend/UsersTable";
import { SearchUsersSkeleton } from "@/components/ui/skeletons/friends/search-users";
import { Suspense } from "react";

export default async function AddFriendPage(
    {searchParams}
    : {
        searchParams: {
            search?: string;
        }
    }
) {

    const search = searchParams.search

    const session = await auth();

    return (
      <ContainerMessages className="flex-col">
        <Header className="md:hidden" />
        <section className="flex flex-col gap-4 px-2 py-4 md:py-8">
          <h2 className="text-center text-xl md:text-4xl pb-4 px-2 text-white">
            Add Friend
          </h2>

          <AddFriendForm />
          <Suspense
            key={`${search}`}
            fallback={<SearchUsersSkeleton />}
          >
            <SearchUsersTable query={search || ''} id={session?.user?.id!} />
          </Suspense>
        </section>
      </ContainerMessages>
    );
}