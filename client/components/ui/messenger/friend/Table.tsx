import { getProfilePhotoAction } from "@/lib/s3";
import { SearchUserType } from "@/types"
import { GrAdd } from "react-icons/gr";

export default function UsersTable(
    {users}
    : {
        users: SearchUserType[] | undefined
    }
) {

    if (!users) {
        return (
            <h2 className="text-center text-white py-4">Search some user</h2>
        )
    }

    return (
      <div className="hidden md:block mt-4">
        {!users.length ? (
          <h2 className="text-white font-semibold text-center py-4">
            There is not result
          </h2>
        ) : (
          <table className="w-full p-2 text-white">
            <thead className="bg-gray-800">
                <tr>
                    <th className="border border-gray-900 py-3 px-1">User</th>
                    <th className="border border-gray-900 py-3 px-1">Email</th>
                    <th className="border border-gray-900 py-3 px-1">Action</th>
                </tr>
            </thead>

            <tbody>
            {users.map(async ({ id, name, image, email, accounts }, index) => (
                <tr key={id} className="border-b border-gray-800">
                  <td className="py-3 px-1 min-w-[150px] flex justify-center items-center gap-2">
                    <span>
                      <img
                        src={accounts.length ? `${image}` : (
                            (await getProfilePhotoAction(image!)).success?.url
                        )}
                        alt={"Photo"}
                        className="w-full max-w-[32px] h-full max-h-[32px] rounded-full object-cover"
                      />
                    </span>
                    <span>{name}</span>
                  </td>
                  <td
                    className="py-3 px-1 text-center whitespace-nowrap break-all overflow-hidden text-ellipsis min-w-[300px]"
                    title={`${email}`}
                  >
                    {email}
                  </td>
                  <td className="min-w-[150px] text-center">
                    <button className="w-fit p-1 bg-green-700 rounded-xl mx-auto hover:bg-green-900">
                        <GrAdd size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
}