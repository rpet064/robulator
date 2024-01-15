import { useState } from "react"
import { FiHelpCircle } from 'react-icons/fi';
import styles from '../styles/Home.module.css'
import AboutMenuModal from "./AboutMenuModal"
import sideMenuStyles from '../styles/SideMenu.module.css'

export default function AboutMenu() {

    const [aboutMenuIsOpen, setAboutMenuIsOpen] = useState(false);

    const toggleMenu = () => {
        setAboutMenuIsOpen(!aboutMenuIsOpen)
    }

    return(
        <div>
            <button className={`${styles.aboutMenuButton} ${sideMenuStyles.darkButton}`} onClick={() => toggleMenu()}>
                <FiHelpCircle />
                <AboutMenuModal aboutMenuIsOpen={aboutMenuIsOpen} setAboutMenuIsOpen={setAboutMenuIsOpen}/>
            </button>
        </div>
    )
}
