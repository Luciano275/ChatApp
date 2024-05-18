import { Spinner } from "@/components/Loading";

export default function Button(
  {text, isLoading}
  : {
    text: string;
    isLoading: boolean;
  }
) {
  return (
    <button
      className={`w-full py-3 2xl:py-4 px-4 rounded-xl ${!isLoading ? 'bg-violet-500 hover:bg-violet-600' : 'bg-violet-800 cursor-default'} text-white font-bold 2xl:text-lg relative`}
      disabled={isLoading}
    >
      {text}
      {
        isLoading && <Spinner width={25} height={25} className="absolute top-3 right-3 z-20" />
      }
    </button>
  )
}