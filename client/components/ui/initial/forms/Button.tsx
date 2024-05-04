export default function Button(
  {text}
  : {
    text: string
  }
) {
  return (
    <button
      className="w-full py-3 2xl:py-4 px-4 rounded-xl bg-violet-500 text-white font-bold 2xl:text-lg hover:bg-violet-600"
    >{text}</button>
  )
}