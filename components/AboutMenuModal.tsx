import React, { FC } from 'react';
import Modal from 'react-modal';
import modalStyles from '../styles/ModalStyles.module.css';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

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
       contentLabel="About menu modal"
       style={{
        content: {
          width: '47.5%',
          height: '85%',
          margin: '0 auto',
          padding: '0px',
        }
      }}
     >
      <div className={modalStyles.modalHeader}>
        <p>About</p>
        <button className={modalStyles.closeModalButton} onClick={() => setAboutMenuIsOpen(false)}>X</button>
      </div>
      
      <div className={modalStyles.modalBody}>
        <h4>"Struggling with complex equations? Our advanced calculator is here to save the day!</h4>
        <p>With its powerful features and user-friendly interface, designed for students, professionals and everyone in-between
           you can tackle any mathematical challenge with ease.
        </p>

        <div>
          <h3>Features include;</h3>
          <br></br>
          <ul>
            <li>Advanced version with 20 unique arithmetic operations</li>
            <li>Compact version with 10 unique arithmetic operations</li>
            <li>Three different colour modes including dark mode, light mode and retro</li>
            <li>Tracks all previous calculations in the current user session</li>
            <li>Accurate and Lightning fast calculations</li>
            <li>Made for all sized monitors from desktop, Ipads and Iphones</li>
          </ul>
        </div>

        <p>Don't let those tricky equations beat you anymore. Our calculator is your secret weapon!"</p>
        <p>Click below to learn more about the design of the calculator, learn more about the the engineer of this application
          and share any feedback, suggestions or improvements</p>
      </div>
      
      <div className={modalStyles.modalFooter}>
      <a className={modalStyles.modalFooterIcon} href="https://github.com/rpet064">
        <FiGithub title="Github" />
      </a>
      <a className={modalStyles.modalFooterIcon} href="https://www.linkedin.com/in/robert-pether-ba9968113">
        <FiLinkedin title="Linkedin" />
      </a>
      <a className={modalStyles.modalFooterIcon} href="mailto:rpether@hotmail.co.nz">
        <FiMail title="Email" />
      </a>
      </div>
     </Modal>
   </div>
 );
};

export default AboutMenuModal;