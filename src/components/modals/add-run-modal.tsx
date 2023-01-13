import { faCircleXmark, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { first, isEmpty } from 'lodash';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { createRun } from '@/api/calls/run';

import InputWithDescription from '../input-with-description';
import Modal from './modal';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const AddRunModal = (props: IProps) => {
  const { open, setOpen } = props;
  const [load, setLoad] = useState(false);
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
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
    setDate(dayjs().format('YYYY-MM-DD'));
    setDuration('');
    setFileUrl('');
    setFile(undefined);
    setError('');
  };

  const sendRun = async () => {
    setLoad(true);
    const errorMessage = await createRun(file, duration, distance, date);
    setLoad(false);
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

  return (
    <Modal setClose={() => setOpen(false)} open={open} title="Register new run">
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
              alt=""
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
        <InputWithDescription
          description="km"
          onChange={(e) => setDistance(e.target.value)}
          label="Distance"
          value={distance}
          type="number"
        />
        <InputWithDescription
          description="h"
          onChange={(e) => setDuration(e.target.value)}
          label="Duration"
          type="number"
          value={duration}
        />
      </div>

      <label className="relative grid w-full gap-2 pt-6">
        <span className="font-bold">Date</span>
        <input
          className="w-full rounded-md border bg-gray-100 p-3 "
          type="date"
          placeholder="Date"
          value={date}
          defaultValue={dayjs().format('YYYY-MM-DD')}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <div className="grid pt-6">
        <button
          className="cursor-pointer rounded-md bg-blue-default py-3 font-bold text-white transition-all ease-in-out active:mx-1 active:bg-blue-dark disabled:cursor-not-allowed disabled:select-none disabled:bg-gray-400"
          onClick={sendRun}
          disabled={load}
        >
          Send
        </button>
      </div>
    </Modal>
  );
};

export default AddRunModal;
