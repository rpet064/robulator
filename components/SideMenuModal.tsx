import React, { FC } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next')

interface SideMenuProps {
  sideMenuIsOpen: boolean
  setSideMenuIsOpen: (value: boolean) => void
}

const SideMenuModal: FC<SideMenuProps> = ({
  sideMenuIsOpen,
  setSideMenuIsOpen
  }) => {

 return (
   <div>
     <Modal
       isOpen={sideMenuIsOpen}
       onRequestClose={() => setSideMenuIsOpen(false)}
       contentLabel="Example Modal"
     >
       <h2>Hello</h2>
       <button onClick={() => setSideMenuIsOpen(false)}>close</button>
       <div>I am a Side Menu Modal</div>
     </Modal>
   </div>
 );
};

export default SideMenuModal;