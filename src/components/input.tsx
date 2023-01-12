import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

const Input = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input className="w-full rounded-md border bg-gray-100 p-3" {...props} />
  );
};

export default Input;
