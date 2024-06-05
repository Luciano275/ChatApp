import { getProfilePhotoAction } from '@/lib/s3';
import { SearchUserType } from '@/types';
import React from 'react';
import { GrAdd } from 'react-icons/gr';

export default function MobileUsersForm(
    {users}
    : {
        users: SearchUserType[]
    }
) {
    return (
      <div className="flex lg:hidden mt-4 flex-col gap-4 px-2">
        {!users.length ? (
          <h2 className="text-white font-semibold text-center py-4">
            There is not result
          </h2>
        ) : (
          users.map(async ({ id, name, email, image, accounts }, index) => (
            <div key={id} className="flex gap-2 items-center">
              <div className='avatar'>
                <div className='mask mask-circle w-10 h-10'>
                  <img
                    src={
                      accounts.length
                        ? `${image}`
                        : (await getProfilePhotoAction(image!)).success?.url
                    }
                    alt={"Photo"}
                  />
                </div>
              </div>
              <div className="grow overflow-hidden">
                <h2 className="text-lg text-white font-semibold w-fit max-w-[150px]">
                  {name}
                </h2>
                <p className="text-sm text-neutral-300 w-fit max-w-[150px]">
                  {email}
                </p>
              </div>
              <div>
                <button className="btn btn-circle btn-success btn-sm text-white">
                    <GrAdd size={25} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
}