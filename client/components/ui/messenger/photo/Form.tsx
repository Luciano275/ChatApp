'use client'

import { isImage, regexToExtWithSlash } from '@/lib/utils';
import fileStyles from '@/styles/file.module.css'
import { Fragment, useEffect, useState } from 'react'
import { BiError } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

type InfoType = {
    message: string | null;
    success: boolean | null;
}

export default function ProfilePhotoForm(
    {profilePhoto}
    : {
        profilePhoto: string
    }
) {

    const [file, setFile] = useState<File | null>(null);
    const [info, setInfo] = useState<InfoType>({
        message: null,
        success: null
    })

    const [image, setImage] = useState<string>(profilePhoto)

    const clearInfo = () => setInfo({
        message: null,
        success: null
    })

    const clear = () => {
        setFile(null);
        setImage(profilePhoto);
        clearInfo();
    }

    useEffect(() => {
        
        if (file) {

            clearInfo();

            const ext = file.type.match(regexToExtWithSlash);

            if (!ext) {
                setInfo({
                    message: 'Invalid file type',
                    success: false
                })
                return;
            }

            const validate = isImage(ext[1]);

            if (!validate) {
                setInfo({
                    message: 'Invalid file type',
                    success: false
                })
                return;
            }

            const imageUrl = URL.createObjectURL(file);

            setImage(imageUrl);

        }

    }, [file])

    return (
      <Fragment>
        <div className="w-[100px] h-[100px] md:w-[180px] md:h-[180px] rounded-full relative">
          <img
            src={image}
            alt={"Profile Photo"}
            className="w-full rounded-full max-w-full h-full max-h-full object-cover object-center"
          />
          {profilePhoto !== image && (
            <span
              onClick={clear}
              className="absolute top-0 right-0 text-neutral-400 cursor-pointer hover:text-white"
            >
              <FaX size={25} />
            </span>
          )}
        </div>
        <form className="w-full max-w-[320px] flex flex-col gap-4 mt-4">
          <div className="relative" id={fileStyles.containerFile}>
            <input
              type="file"
              name="image"
              id="image"
              className="p-2 relative z-10 opacity-0 cursor-pointer w-full text-sm"
              onChange={(e) => setFile(e.target.files![0])}
            />
            <span className="absolute md:-z-10 top-0 left-0 w-full h-full bg-blue-700 flex items-center justify-center rounded-xl text-white font-semibold">
              Select photo
            </span>
          </div>

          <button className="p-2 text-white bg-gray-900 rounded-xl hover:bg-gray-800">
            Save
          </button>

          {info.message && (
            <p
              className={`${
                info.success ? "bg-green-600" : "bg-red-500"
              } text-sm text-white p-2 rounded-xl bg-opacity-50 flex justify-start gap-2 items-center`}
            >
              {info.success ? (
                <FaCheckCircle size={20} />
              ) : (
                <BiError size={20} />
              )}
              {info.message}
            </p>
          )}
        </form>
      </Fragment>
    );
}