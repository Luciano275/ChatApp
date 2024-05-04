import { Dispatch, SetStateAction } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa6"

export default function EyeButton(
  { showPass, setShowPass }
  : {
    showPass: boolean
    setShowPass: Dispatch<SetStateAction<boolean>>
  }
) {
  return (
    <span
      className="absolute text-violet-600 right-3 top-3 2xl:top-5 cursor-pointer hover:text-violet-400"
      onClick={() => setShowPass((prev) => !prev)}
    >
      { !showPass ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
    </span>
  )
}