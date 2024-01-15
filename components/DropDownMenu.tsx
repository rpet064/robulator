import { useState } from "react"
import sideMenuStyles from '../styles/SideMenu.module.css'
import { FaCog, FaMoon } from 'react-icons/fa';
import { TbPacman } from "react-icons/tb";
import { WiDaySunny } from "react-icons/wi";
import AboutMenu from "./AboutMenu";

export default function DropDownMenu() {

  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

    const toggleMenu = () => {
        setSideMenuIsOpen(!sideMenuIsOpen)
    }

    const toggleTheme = (mode: string) => {
        setTheme(mode)
    }

    return(
        <div>
            <button className={`${sideMenuStyles.sideMenuButton} ${sideMenuStyles.popupMenuButton} ${sideMenuStyles.darkButton}`} onClick={() => toggleMenu()}>
            <FaCog />
            {sideMenuIsOpen && (
            <div className={sideMenuStyles.sideMenuContainer}>
                <AboutMenu/>
                <button className={sideMenuStyles.darkButton} onClick={() => toggleTheme("light")}>
                    <WiDaySunny />
                </button>
                <button className={sideMenuStyles.darkButton} onClick={() => toggleTheme("dark")}>
                    <FaMoon />
                </button>
                <button className={sideMenuStyles.darkButton} onClick={() => toggleTheme("retro")}>
                    <TbPacman />
                </button>
            </div>
                )}
            </button>
        </div>
    )
     
}
