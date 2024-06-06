import { getProfilePhotoAction } from "@/lib/s3";
import { SearchUserType } from "@/types"
import { GrAdd } from "react-icons/gr";
import AddFriendButton from "./AddFriendButton";

export default function UsersTable(
    {users}
    : {
        users: SearchUserType[]
    }
) {
    return (
      <div className="hidden lg:block mt-4">
        {!users.length ? (
          <h2 className="text-white font-semibold text-center py-4">
            There is not result
          </h2>
        ) : (
          <table className="table">
            <thead className="bg-gray-800">
                <tr className="text-white">
                    <th className="text-center">User</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>

            <tbody>
            {users.map(async ({ id, name, image, email, accounts }, index) => (
                <tr key={id} className="hover:bg-base-300">
                  <td className="flex gap-2 items-center justify-center">
                    <div className="avatar">
                      <div className="mask mask-circle w-10 h-10">
                        <img
                          src={accounts.length ? `${image}` : (
                              (await getProfilePhotoAction(image!)).success?.url
                          )}
                          alt={"Photo"}
                        />
                      </div>
                    </div>
                    <span>{name}</span>
                  </td>
                  <td
                    className="text-center"
                    title={`${email}`}
                  >
                    {email}
                  </td>
                  <td className="text-center">
                    <AddFriendButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
}