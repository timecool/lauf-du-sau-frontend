import { faCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { first, isEmpty, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { deleteUserImage, updateUser } from '@/api/calls/user';
import type { IUpdateUser } from '@/models/user';
import { useAuthStore } from '@/store/auth';

import Input from '../input';
import Modal from './modal';

interface IProps {
  close: () => void;
  open: boolean;
}
const ProfileEditModal = (props: IProps) => {
  const { close, open } = props;
  const user = useAuthStore((state) => state.user);

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [load, setLoad] = useState(false);
  const [fileUrl, setFileUrl] = useState(user.image_url);
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState('');
  const onDrop = useCallback((acceptedFiles: any) => {
    const fileZone: File | undefined = first(acceptedFiles);
    if (isEmpty(fileZone)) return;
    const newFileUrl = URL.createObjectURL(fileZone);
    setFileUrl(newFileUrl);
    setFile(fileZone);
  }, []);

  const updateOnClick = async () => {
    const userUpdate: IUpdateUser = {};
    if (!isEmpty(user.image_url) && isEmpty(file)) deleteUserImage();
    if (!isEmpty(file)) userUpdate.file = file;
    if (!isEqual(user.email, email)) userUpdate.email = email;
    if (!isEqual(user.username, username)) userUpdate.username = username;

    if (isEmpty(userUpdate)) {
      setError('Nothing change');
      return;
    }
    setLoad(true);

    const errorMessage = await updateUser(userUpdate);
    setLoad(false);
    if (!isEmpty(errorMessage)) {
      setError(errorMessage);
      return;
    }
    close();
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
    <Modal setClose={close} open={open} title="Edit Profile">
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
              icon={faUser}
              className="h-32 w-60 text-6xl text-gray-700"
            />
          )}
        </div>
      ) : (
        <div className="relative mt-6 flex justify-center">
          <div className="relative">
            <img
              src={fileUrl}
              className="aspect-square h-60 rounded-full border-2 border-black object-cover shadow-xl"
              alt=""
            />
            <FontAwesomeIcon
              onClick={() => {
                setFile(undefined);
                setFileUrl('');
              }}
              icon={faCircleXmark}
              className="absolute -right-3 -top-3 rounded-full bg-white text-xl"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3 py-12">
        <label>
          Name
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          E-Mail
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <button
        onClick={updateOnClick}
        className="cursor-pointer rounded-md bg-blue-default py-3 font-bold text-white transition-all ease-in-out active:mx-1 active:bg-blue-dark disabled:cursor-not-allowed disabled:select-none disabled:bg-gray-400"
        disabled={load}
      >
        Update
      </button>
    </Modal>
  );
};

export default ProfileEditModal;
