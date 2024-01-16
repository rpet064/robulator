import { useState, FC, SetStateAction, Dispatch } from "react"
import sideMenuStyles from '../styles/SideMenu.module.css'
import { TbPacman, TbAdjustmentsCog, TbMoonFilled, TbSunHigh } from "react-icons/tb";
import AboutMenu from "./AboutMenu";

interface SideMenuProps {
    isAdvancedCalculations: boolean
    setIsAdvancedCalculations: Dispatch<SetStateAction<boolean>>
  }

const SideMenu: FC<SideMenuProps> = ({
    isAdvancedCalculations,
    setIsAdvancedCalculations
    }) => {

  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

    const toggleMenu = () => {
        setSideMenuIsOpen(!sideMenuIsOpen)
    }

    const toggleTheme = (mode: string) => {
        setTheme(mode)
    }

    const toggleCalculationsMode = () => {
        setIsAdvancedCalculations(!isAdvancedCalculations)
    }

    return(
        <div>
            <button className={
                `${sideMenuStyles.sideMenuButton} ${sideMenuStyles.popupMenuButton} ${sideMenuStyles.darkButton}`} 
                onClick={() => toggleMenu()}
                >
            <TbAdjustmentsCog name="Settings"/>

            {sideMenuIsOpen && (
            <div className={sideMenuStyles.sideMenuContainer}>
                <button className={sideMenuStyles.darkButton} onClick={() => toggleTheme("light")} name="Light Mode">
                    <TbSunHigh />
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
            </button>
        </div>
    )
}

export default SideMenu