import type { MainFormErrors, ResponseMainFormAction } from "@/types";

export default function FormError(
  { state, field, id }:
  {
    id: string;
    state: ResponseMainFormAction;
    field: keyof MainFormErrors
  }
) {
  if (state && state.errors && state.errors[field]) {
    return (
      <ul id={id} aria-live={'polite'} aria-atomic>
        {
          state.errors[field]?.map((error, index) => (
            <li key={`${id}:${index}`} className="text-red-600 text-sm">
              {error}
            </li>
          ))
        }
      </ul>
    )
  }
}