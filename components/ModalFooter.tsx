import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import modalStyles from '../styles/ModalStyles.module.css'
import colours from '../styles/Colours.module.css'

const ModalFooter = () => {
    return (
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
    )
}

export default ModalFooter