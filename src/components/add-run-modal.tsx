import { faCircleXmark, faImage, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { first, isEmpty } from 'lodash';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { createRun } from '@/api/calls/run';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const AddRunModal = (props: IProps) => {
  const { open, setOpen } = props;
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState('');
  const onDrop = useCallback((acceptedFiles: any) => {
    const fileZone: File | undefined = first(acceptedFiles);
    if (isEmpty(fileZone)) return;
    const newFileUrl = URL.createObjectURL(fileZone);
    setFileUrl(newFileUrl);
    setFile(fileZone);
  }, []);

  const resetAll = () => {
    setDistance('');
    setDate('');
    setDuration('');
    setFileUrl('');
    setFile(undefined);
    setError('');
  };

  const sendRun = async () => {
    const errorMessage = await createRun(file, duration, distance, date);
    if (!isEmpty(errorMessage)) {
      setError(errorMessage);
      return;
    }
    resetAll();
    setOpen(false);
  };

  const accept = {
    'image/jpeg': [],
    'image/png': [],
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  const style = open ? 'opacity-70' : 'opacity-0';
  const style2 = open ? 'bottom-[79px]' : '-bottom-[1000px]';
  return (
    <>
      {open && (
        <div
          className={`${style} fixed top-0 h-screen w-full bg-black transition-all ease-in-out `}
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`${style2} fixed z-20 h-[82vh] w-full overflow-x-auto rounded-t-lg bg-white p-4 transition-all ease-in-out `}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Register new run</h2>
          <FontAwesomeIcon
            onClick={() => setOpen(false)}
            className="h-6 cursor-pointer text-xl font-bold"
            icon={faX}
          />
        </div>
        {!isEmpty(error) && (
          <div className="rounded-md border border-red-700 bg-red-400 py-3 px-2 text-white">
            {error}
          </div>
        )}
        {isEmpty(fileUrl) ? (
          <div
            className="mx-auto mt-6 flex h-60 w-60 items-center justify-center rounded-full bg-gray-200 "
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <FontAwesomeIcon
                icon={faImage}
                className="h-32 w-60 text-6xl text-gray-700"
              />
            )}
          </div>
        ) : (
          <div className="relative mt-6 flex justify-center">
            <div className="relative">
              <img
                src={fileUrl}
                className="h-60  border-2 border-black shadow-xl"
              />
              <FontAwesomeIcon
                onClick={() => setFileUrl('')}
                icon={faCircleXmark}
                className="absolute -right-3 -top-3 rounded-full bg-white text-xl"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-12">
          <label className="grid w-full gap-2">
            <span className="font-bold">Distance</span>
            <div className="relative">
              <input
                className="w-full rounded-md border bg-gray-100 py-3 pl-3 pr-10"
                type="number"
                onChange={(e) => setDistance(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                km
              </div>
            </div>
          </label>

          <label className="grid w-full gap-2">
            <span className="font-bold">Duration</span>
            <div className="relative">
              <input
                className="w-full rounded-md border bg-gray-100 py-3 pl-3 pr-10"
                type="number"
                onChange={(e) => setDuration(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">h</div>
            </div>
          </label>
        </div>

        <label className="relative grid w-full gap-2 pt-6">
          <span className="font-bold">Date</span>
          <input
            className="w-full rounded-md border bg-gray-100 p-3 "
            type="date"
            placeholder="Date"
            defaultValue={dayjs().format('YYYY-MM-DD')}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <div className="grid pt-6">
          <button
            className="cursor-pointer rounded-md bg-blue-default py-3 font-bold text-white transition-all ease-in-out active:mx-1 active:bg-blue-dark disabled:cursor-not-allowed disabled:select-none disabled:bg-gray-400"
            onClick={sendRun}
            // disabled={load}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default AddRunModal;
