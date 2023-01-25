import {
  faCannabis,
  faListUl,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty, isEqual } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/store/auth';

import AddRunModal from './modals/add-run-modal';
import ProfileImage from './profile-image';

const AppBar = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setModalOpen(false);
  }, [router]);

  if (isEmpty(user)) return <></>;

  return (
    <>
      {isEqual(user.role, 'admin') && (
        <Link href="/admin">
          <div className="fixed top-3 right-3 flex h-8 w-8 items-baseline justify-center rounded-full bg-blue-dark text-white">
            <FontAwesomeIcon className="my-auto" icon={faScrewdriverWrench} />
          </div>
        </Link>
      )}
      <AddRunModal open={modalOpen} setOpen={setModalOpen}></AddRunModal>
      <div className="fixed bottom-0 z-20 w-full pb-safe">
        <div className="flex h-16 grid-cols-3 flex-row items-center justify-between border-t border-black/25 bg-white/75 px-10  py-6 text-2xl text-appBar-icons-disabled drop-shadow-appBar backdrop-blur-lg sm:px-4">
          <Link href={'/'}>
            <FontAwesomeIcon icon={faListUl} />
          </Link>
          <FontAwesomeIcon
            onClick={() => setModalOpen(!modalOpen)}
            icon={faCannabis}
          />
          <Link href={'/profile'}>
            <ProfileImage
              src={user.image_url}
              name={user.username}
              className="h-9 rounded-full"
            />
          </Link>
        </div>
      </div>

      <div className="h-28" />
    </>
  );
};

export default AppBar;
