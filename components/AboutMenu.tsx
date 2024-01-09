import { useState } from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/Home.module.css'
import { notifyMessage } from "./utility/toastMessages"

library.add(faCircleQuestion)

export default function AboutMenu() {

    const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsAboutMenuOpen(!isAboutMenuOpen)

        notifyMessage('In progress')
    }

    return(
        <div>
            <button className={styles.aboutMenuButton} onClick={() => toggleMenu()}>
                <FontAwesomeIcon icon={faCircleQuestion} />
            </button>
        </div>
    )
}
