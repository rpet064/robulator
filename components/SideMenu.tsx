import { useState, FC, SetStateAction, Dispatch } from "react"
import sideMenuStyles from '../styles/SideMenu.module.css'
import { TbPacman, TbAdjustmentsCog, TbMoonFilled, TbSunHigh, TbSettingsOff, TbSettings } from "react-icons/tb";
import AboutMenu from "./AboutMenu";

interface SideMenuProps {
    ScientificSymbolsArray: boolean
    setScientificSymbolsArray: Dispatch<SetStateAction<boolean>>
    setTheme: Dispatch<SetStateAction<string>>
  }

const SideMenu: FC<SideMenuProps> = ({
    ScientificSymbolsArray,
    setScientificSymbolsArray,
    setTheme
    }) => {

  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);

    const toggleMenu = () => {
        setSideMenuIsOpen(!sideMenuIsOpen)
    }

    const toggleTheme = (mode: string) => {
        setTheme(mode)
    }

    const toggleCalculationsMode = () => {
        setScientificSymbolsArray(!ScientificSymbolsArray)
    }

    return(
        <div>
            <button className={
                `${sideMenuStyles.sideMenuButton} ${sideMenuStyles.popupMenuButton} ${sideMenuStyles.darkButton}`} 
                onClick={() => toggleMenu()}
                >
            {sideMenuIsOpen ? <TbSettingsOff name="Settings" /> : <TbSettings name="Settings" />}
            </button>
     
            {sideMenuIsOpen && (
            <div className={sideMenuStyles.sideMenuContainer}>
                <button className={sideMenuStyles.darkButton} onClick={() => toggleCalculationsMode()} name="Advanced Calculations">
                    <TbAdjustmentsCog />
                </button>
                <button className={sideMenuStyles.darkButton} onClick={() => toggleTheme("light")} name="Light Mode">
                    <TbSunHigh />
                </button>
                <button className={sideMenuStyles.darkButton} onClick={() => toggleTheme("dark")} name="Dark Mode">
                    <TbMoonFilled />
                </button>
                <button className={sideMenuStyles.darkButton} onClick={() => toggleTheme("retro")} name="Retro Mode">
                    <TbPacman />
                </button>
                <AboutMenu/>
            </div>
                )}
        </div>
     )
}

export default SideMenu