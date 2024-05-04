export default function Input(
  { type, ariaDescribedBy, id, name, placeholder, onChange }
  : {
    type: HTMLInputElement['type']
    placeholder: string;
    name: string;
    id: string;
    ariaDescribedBy: string
    value: string;
    onChange: (e: any) => void
  }
) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      aria-describedby={ariaDescribedBy}
      className={'w-full py-3 2xl:py-4 px-6 bg-gray-800 rounded-xl outline-none transition-colors focus:bg-gray-700 border border-transparent focus:border-violet-500 2xl:text-lg text-white'}
      onChange={onChange}
    />
  )
}