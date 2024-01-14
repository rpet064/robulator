import { useState } from "react"
import styles from '../styles/Home.module.css'
import dropDownStyles from '../styles/DropdownStyles.module.css'
import { FiChevronDown, FiChevronLeft } from 'react-icons/fi';

interface SideNavBarToggleIconProps {
    sideMenuIsOpen: boolean;
   }

export default function DropDownMenu() {

  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);

  const SideNavBarToggleIcon: React.FC<SideNavBarToggleIconProps> = ({ sideMenuIsOpen }) => {
    return sideMenuIsOpen ? <FiChevronDown /> : <FiChevronLeft />;
   };

    const toggleMenu = () => {
        setSideMenuIsOpen(!sideMenuIsOpen)
    }

    return(
        <div>
            <button className={`${styles.sideMenuButton} ${styles.popupMenuButton}`} onClick={() => toggleMenu()}>
                <SideNavBarToggleIcon sideMenuIsOpen={sideMenuIsOpen} />
            </button>
        </div>
    )
}
