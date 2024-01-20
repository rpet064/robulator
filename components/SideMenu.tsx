import { useState, FC, SetStateAction, Dispatch } from "react"
import sideMenuStyles from '../styles/SideMenu.module.css'
import { TbPacman, TbAdjustmentsCog, TbMoonFilled, TbSunHigh, TbSettingsOff, TbSettings } from "react-icons/tb";
import AboutMenu from "./AboutMenu";
import colours from '../styles/Colours.module.css'


interface SideMenuProps {
    ScientificSymbolsArray: boolean
    setScientificSymbolsArray: Dispatch<SetStateAction<boolean>>
    theme: string
    setTheme: Dispatch<SetStateAction<string>>
  }

const SideMenu: FC<SideMenuProps> = ({
    ScientificSymbolsArray,
    setScientificSymbolsArray,
    theme,
    setTheme
    }) => {

  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);

    const toggleMenu = () => {
        setSideMenuIsOpen(!sideMenuIsOpen)
    }

    const toggleTheme = (currentTheme: string) => {
        setTheme(currentTheme)
    }

    const toggleCalculationsMode = () => {
        setScientificSymbolsArray(!ScientificSymbolsArray)
    }

    return(
        <div>
            <button className={
                `${sideMenuStyles.sideMenuButton} ${sideMenuStyles.popupMenuButton} 
                ${theme === "light" ? colours.darkButton : colours.lightButton} `} 
                onClick={() => toggleMenu()}
                >
            {sideMenuIsOpen ? <TbSettingsOff name="Settings" className={theme === "light" ? colours.lightIcon : colours.darkIcon}/> : 
            <TbSettings name="Settings" className={theme === "light" ? colours.lightIcon : colours.darkIcon}/>}
            </button>
     
            {sideMenuIsOpen && (
            <div className={sideMenuStyles.sideMenuContainer}>
                <button className={theme === "light" ? colours.darkButton : colours.lightButton} 
                onClick={() => toggleCalculationsMode()} 
                name="Advanced Calculations">
                    <TbAdjustmentsCog className={theme === "light" ? colours.lightIcon : colours.darkIcon}/>
                </button>
                <button className={theme === "light" ? colours.darkButton : colours.lightButton} 
                onClick={() => toggleTheme("light")} name="Light Mode">
                    <TbSunHigh className={theme === "light" ? colours.lightIcon : colours.darkIcon}/>
                </button>
                <button className={theme === "light" ? colours.darkButton : colours.lightButton} 
                onClick={() => toggleTheme("dark")} name="Dark Mode">
                    <TbMoonFilled className={theme === "light" ? colours.lightIcon : colours.darkIcon}/>
                </button>
                <AboutMenu theme={theme}/>
            </div>
                )}
        </div>
     )
}

export default SideMenu