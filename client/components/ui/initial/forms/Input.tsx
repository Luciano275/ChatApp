export default function Input(
  { type, ariaDescribedBy, id, name, placeholder }
  : {
    type: HTMLInputElement['type']
    placeholder: string;
    name: string;
    id: string;
    ariaDescribedBy: string
  }
) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      aria-describedby={ariaDescribedBy}
      className={'w-full py-4 px-6 bg-gray-800 rounded-xl outline-none transition-colors focus:bg-gray-700 border border-transparent focus:border-violet-500 text-lg text-white'}
    />
  )
}