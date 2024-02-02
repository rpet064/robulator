import { FC, useEffect, useState } from 'react';
import Modal from 'react-modal';
import modalStyles from '../styles/ModalStyles.module.css';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import useWindowSize from './utility/windowSize';
import colours from '../styles/Colours.module.css';

Modal.setAppElement('#__next')

interface AboutMenuProps {
  aboutMenuIsOpen: boolean
  setAboutMenuIsOpen: (value: boolean) => void
}

const AboutMenuModal: FC<AboutMenuProps> = ({
  aboutMenuIsOpen,
  setAboutMenuIsOpen
  }) => {

    const { width } = useWindowSize();
    const [modalWidth, setModalWidth] = useState('47.5%');
    const [modalHeight, setModalHeight] = useState('85%');
    const [modalInset, setmModalInset] = useState('40px');
   
    useEffect(() => {
      if (width <= 1200) {
        setModalWidth('85%');
      } else {
        setModalWidth('50%');
      }
    }, [width]);

    useEffect(() => {
      if (width <= 768) {
        setModalHeight('97.5%');
      } else {
        setModalHeight('85%');
      }
    }, [width]);

    useEffect(() => {
      if (width <= 568) {
        setmModalInset('1px');
      } else {
        setmModalInset('40px');
      }
    }, [width]);

 return (
   <div>
     <Modal
       isOpen={aboutMenuIsOpen}
       onRequestClose={() => setAboutMenuIsOpen(false)}
       contentLabel="About menu modal"
       style={{
        content: {
          width: modalWidth,
          height: modalHeight,
          margin: 'auto',
          padding: '0px',
        }
      }}
     >
      <div className={` ${modalStyles.modalHeader} ${colours.blueBackground} ${colours.lightText}`}>
        <p>About</p>
        <button className={`${modalStyles.closeModalButton} ${colours.lightText}`} onClick={() => setAboutMenuIsOpen(false)}>X</button>
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
      
      <div className={`${modalStyles.modalFooter} ${colours.blueBackground} ${colours.lightText}`}>
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

export default AboutMenuModal