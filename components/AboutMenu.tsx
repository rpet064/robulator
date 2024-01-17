import { useState } from "react"
import { FiHelpCircle } from 'react-icons/fi';
import AboutMenuModal from "./AboutMenuModal"
import sideMenuStyles from '../styles/SideMenu.module.css'

export default function AboutMenu() {

    const [aboutMenuIsOpen, setAboutMenuIsOpen] = useState(false);

    const toggleMenu = () => {
        setAboutMenuIsOpen(!aboutMenuIsOpen)
    }

    return(
        <div>
            <button className={sideMenuStyles.darkButton} onClick={() => toggleMenu()}>
                <FiHelpCircle />
                <AboutMenuModal aboutMenuIsOpen={aboutMenuIsOpen} setAboutMenuIsOpen={setAboutMenuIsOpen}/>
            </button>
        </div>
    )
}
