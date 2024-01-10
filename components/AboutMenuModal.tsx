import React, { FC } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next')

interface AboutMenuProps {
  aboutMenuIsOpen: boolean
  setAboutMenuIsOpen: (value: boolean) => void
}

const AboutMenuModal: FC<AboutMenuProps> = ({
  aboutMenuIsOpen,
  setAboutMenuIsOpen
  }) => {

 return (
   <div>
     <Modal
       isOpen={aboutMenuIsOpen}
       onRequestClose={() => setAboutMenuIsOpen(false)}
       contentLabel="Example Modal"
     >
       <h2>Hello</h2>
       <button onClick={() => setAboutMenuIsOpen(false)}>close</button>
       <div>I am a AboutMenuModal</div>
     </Modal>
   </div>
 );
};

export default AboutMenuModal;