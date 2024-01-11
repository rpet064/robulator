import React, { FC } from 'react';
import Modal from 'react-modal';
import modalStyles from '../styles/ModalStyles.module.css';

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
       contentLabel="About Menu Modal"
       style={{
        content: {
          width: '47.5%',
          height: '82.5%',
          margin: 'auto',
        }
      }}
     >
      <div className={modalStyles.modalHeader}>
        <button className={modalStyles.closeModalButton} onClick={() => setAboutMenuIsOpen(false)}>X</button>
      </div>
      
      <div className={modalStyles.modalBody}>
        
      </div>
      
      <div className={modalStyles.modalFooter}>
        
      </div>
     </Modal>
   </div>
 );
};

export default AboutMenuModal;