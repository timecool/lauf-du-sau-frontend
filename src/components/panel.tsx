import type { FC, ReactNode } from 'react';

interface IPanelProp {
  children: ReactNode;
}

const Panel: FC<IPanelProp> = ({ children }) => {
  return (
    <div className="rounded-md border border-black/10 bg-white p-5 shadow-md">
      {children}
    </div>
  );
};

export default Panel;
