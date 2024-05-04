import { ResponseMainFormAction } from "@/types"
import { BiErrorCircle } from "react-icons/bi"
import { FaCheckCircle } from "react-icons/fa"

export default function FormMessage(
  {state}:
  {
    state: ResponseMainFormAction
  }
) {
  return (
    state.message && (
      <p className={`p-2 text-white rounded-lg ${state.success ? 'bg-green-600' : 'bg-red-600'} bg-opacity-80 flex gap-2 justify-center items-center`}>
        {state.success ? <FaCheckCircle size={20} /> : <BiErrorCircle size={20} />}
        {state.message}
      </p>
    )
  )
}