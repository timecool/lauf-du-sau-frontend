import { faCannabis, faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import AddRunModal from './add-run-modal';
import ProfileImage from './profile-image';

const AppBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <AddRunModal open={modalOpen} setOpen={setModalOpen}></AddRunModal>
      <div className="fixed bottom-0 z-20 w-full pb-safe">
        <div className="flex h-20 grid-cols-3 flex-row items-center justify-between border-t-2 border-black bg-white px-10 py-6 text-2xl  sm:px-4">
          <FontAwesomeIcon icon={faListUl} />
          <FontAwesomeIcon
            onClick={() => setModalOpen(!modalOpen)}
            icon={faCannabis}
          />
          <ProfileImage className="aspect-square h-full" />
        </div>
      </div>
    </>
  );
};

export default AppBar;
