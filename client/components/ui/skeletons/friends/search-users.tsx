import React from "react"

const RowSkeleton = () => {
    return (
      <tr>

        <td className="flex justify-center items-center gap-2 py-3 px-1 min-w-[150px]">
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

export const SearchUsersSkeleton = () => {
    return (
      <React.Fragment>
        {/* Dekstop Form */}
        <div className="hidden md:block mt-4">
          <table className="w-full p-2 text-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="border border-gray-900 py-3 px-1">User</th>
                <th className="border border-gray-900 py-3 px-1">Email</th>
                <th className="border border-gray-900 py-3 px-1">Action</th>
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
      </React.Fragment>
    );
}