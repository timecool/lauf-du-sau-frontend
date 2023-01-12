import { omit } from 'lodash';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface IProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  description: string;
}

const InputWithDescription = (props: IProps) => {
  const { label, description } = props;
  const inputProps = omit(props, ['label', 'description']);
  return (
    <label className="grid w-full gap-2">
      <span className="font-bold">{label}</span>
      <div className="relative">
        <input
          className="w-full rounded-md border bg-gray-100 py-3 pl-3 pr-10"
          {...inputProps}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {description}
        </div>
      </div>
    </label>
  );
};

export default InputWithDescription;
