import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  open: boolean;
  title?: string;
  setClose: () => void;
  children: any;
}

const Modal = (props: IProps) => {
  const { open, setClose, title, children } = props;
  const style = open ? 'opacity-70' : 'opacity-0';
  const style2 = open ? 'bottom-[79px]' : '-bottom-[1000px]';
  return (
    <>
      {open && (
        <div
          className={`${style} fixed top-0 left-0 h-screen w-full bg-black transition-all ease-in-out `}
          onClick={setClose}
        />
      )}
      <div
        className={`${style2} fixed left-0 z-20 h-[82vh] w-full overflow-x-auto rounded-t-lg bg-white p-4 transition-all ease-in-out `}
      >
        <div className="relative flex w-full flex-col justify-center gap-3 ">
          <span className="flex w-full items-center">
            <h2 className="text-2xl font-bold">{title}</h2>
            <FontAwesomeIcon
              onClick={setClose}
              className="absolute right-0 h-full cursor-pointer  text-xl font-bold"
              icon={faX}
            />
          </span>
          <hr className="w-full" />
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
