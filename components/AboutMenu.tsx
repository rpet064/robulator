import { useState } from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/Home.module.css'
import AboutMenuModal from "./AboutMenuModal"

library.add(faCircleQuestion)

export default function AboutMenu() {

    const [aboutMenuIsOpen, setAboutMenuIsOpen] = useState(false);

    const toggleMenu = () => {
        setAboutMenuIsOpen(!aboutMenuIsOpen)
    }

    return(
        <div>
            <button className={`${styles.aboutMenuButton} ${styles.popupMenuButton}`} onClick={() => toggleMenu()}>
                <FontAwesomeIcon icon={faCircleQuestion} />
                <AboutMenuModal aboutMenuIsOpen={aboutMenuIsOpen} setAboutMenuIsOpen={setAboutMenuIsOpen} />
            </button>
        </div>
    )
}
