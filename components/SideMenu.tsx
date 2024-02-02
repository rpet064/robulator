import { useState, FC, SetStateAction, Dispatch } from "react"
import sideMenuStyles from '../styles/SideMenu.module.css'
import { TbAdjustmentsCog, TbMoonFilled, TbSunHigh, TbSettingsOff, TbSettings } from "react-icons/tb";
import { AboutMenu } from "./AboutMenu";
import colours from '../styles/Colours.module.css'


interface SideMenuProps {
    ScientificSymbolsArray: boolean
    setScientificSymbolsArray: Dispatch<SetStateAction<boolean>>
    theme: string
    setTheme: Dispatch<SetStateAction<string>>
  }

export const SideMenu: FC<SideMenuProps> = ({
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

    const getStyleForButton = (theme: string) => {
        return theme === "light" ? colours.darkButton : colours.lightButton;
       }
       
       const getStyleForIcon = (theme: string) => {
        return theme === "light" ? colours.lightIcon : colours.darkIcon;
       }

    const toggleCalculationsMode = () => {
        setScientificSymbolsArray(!ScientificSymbolsArray)
    }

    return(
        <div>
            <button className={
                `${sideMenuStyles.sideMenuButton} ${sideMenuStyles.popupMenuButton} ${getStyleForButton(theme)} `}
                onClick={() => toggleMenu()} >
            {sideMenuIsOpen ? <TbSettingsOff className={getStyleForIcon(theme)} name="Settings"/> :
            <TbSettings className={getStyleForIcon(theme)} name="Settings" /> }
            </button>
     
            {sideMenuIsOpen && (
            <div className={sideMenuStyles.sideMenuContainer}>
                <button className={getStyleForButton(theme)} onClick={() => toggleCalculationsMode()} name="Advanced Calculations">
                <TbAdjustmentsCog className={getStyleForIcon(theme)}/>
                </button>
                <button className={getStyleForButton(theme)} onClick={() => toggleTheme("light")} name="Light Mode">
                <TbSunHigh className={getStyleForIcon(theme)}/>
                </button>
                <button className={getStyleForButton(theme)} onClick={() => toggleTheme("dark")} name="Dark Mode">
                <TbMoonFilled className={getStyleForIcon(theme)}/>
                </button>
                <AboutMenu theme={theme}/>
            </div>
                )}
        </div>
     )
}