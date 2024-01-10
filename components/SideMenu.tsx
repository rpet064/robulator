import { useState } from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/Home.module.css'
import SideMenuModal from "./SideMenuModal"
library.add(faAngleLeft, faAngleDown)

export default function SideMenu() {

  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);

    const sideNavBarToggleIcon = sideMenuIsOpen ? faAngleDown : faAngleLeft

    const toggleMenu = () => {
        setSideMenuIsOpen(!sideMenuIsOpen)
    }

    return(
        <div>
            <button className={`${styles.sideMenuButton} ${styles.popupMenuButton}`} onClick={() => toggleMenu()}>
                <FontAwesomeIcon icon={sideNavBarToggleIcon} />
                <SideMenuModal sideMenuIsOpen={sideMenuIsOpen} setSideMenuIsOpen={setSideMenuIsOpen} />
            </button>
        </div>
    )
}
