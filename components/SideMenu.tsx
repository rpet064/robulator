import { useState } from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/Home.module.css'
import { notifyMessage } from "./utility/toastMessages"

library.add(faAngleLeft, faAngleDown)

export default function SideMenu() {

    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)

    const sideNavBarToggleIcon = isMenuCollapsed ? faAngleDown : faAngleLeft

    const toggleMenu = () => {
        setIsMenuCollapsed(!isMenuCollapsed)

        notifyMessage('In progress')
    }

    return(
        <div className="side-menu">
            <button className={styles.sideMenuButton} onClick={() => toggleMenu()}>
                <FontAwesomeIcon className={styles.sideMenuButtonIcon}  icon={sideNavBarToggleIcon} />
            </button>
        </div>
    )
}
