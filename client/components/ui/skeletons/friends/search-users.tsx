import React from "react"

const RowSkeleton = () => {
    return (
      <tr className="hover:bg-base-300">

        <td className="flex gap-2 items-center justify-center">
          <span className="w-[32px] h-[32px] bg-neutral-600 animate-pulse rounded-full"></span>
          <span className="block w-32 bg-neutral-600 h-4 rounded-xl animate-pulse"></span>
        </td>

        <td
            className="py-3 px-1 min-w-[300px]"
        >
            <span className="block w-48 mx-auto bg-neutral-600 h-4 rounded-xl animate-pulse"></span>
        </td>

        <td className="min-w-[150px] flex">
            <span className="block w-8 mx-auto bg-neutral-600 h-8 rounded-xl animate-pulse"></span>

        </td>
      </tr>
    );
}

const RowUser = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-10 h-10 bg-neutral-600 rounded-full animate-pulse"></div>
      <div className="grow overflow-hidden flex flex-col gap-2">
        <div className="w-36 h-4 rounded-xl bg-neutral-600 animate-pulse"></div>
        <div className="w-52 h-4 rounded-xl bg-neutral-600 animate-pulse"></div>
      </div>
      <div className="w-8 h-8 bg-neutral-600 rounded-full animate-pulse"></div>
    </div>
  )
}

export const SearchUsersSkeleton = () => {
    return (
      <React.Fragment>
        {/* Dekstop Form */}
        <div className="hidden md:block mt-4">
          <table className="table">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="text-center">User</th>
                <th className="text-center">Email</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />

              <RowSkeleton />
              <RowSkeleton />
            </tbody>
          </table>
        </div>

        {/* Mobile Form */}
        <div className="flex lg:hidden mt-4 flex-col gap-4 px-2">
          <RowUser />
        </div>
      </React.Fragment>
    );
}