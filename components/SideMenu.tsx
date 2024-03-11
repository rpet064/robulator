import { useState, FC } from "react";
import sideMenuStyles from '../styles/SideMenu.module.css';
import { TbAdjustmentsCog, TbMoonFilled, TbSunHigh, TbSettingsOff, TbSettings, TbHistoryOff } from "react-icons/tb";
import AboutMenu from "./AboutMenu";
import colours from '../styles/Colours.module.css';
import { clearLocalStorage } from "./utility/localStorageManager";
import { SideMenuProps } from './utility/interfacePropsManager';

const SideMenu: FC<SideMenuProps> = ({
    ScientificSymbolsArray,
    setScientificSymbolsArray,
    theme,
    setTheme,
    setPrevOperationsArray
}) => {

    const [sideMenuIsOpen, setSideMenuIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setSideMenuIsOpen(!sideMenuIsOpen);
    };

    const toggleTheme = (currentTheme: string) => {
        setTheme(currentTheme);
    };

    const getStyleForButton = (theme: string) => {
        return theme === "light" ? colours.darkButton : colours.lightButton;
    };

    const getStyleForIcon = (theme: string) => {
        return theme === "light" ? colours.lightIcon : colours.darkIcon;
    };

    const toggleCalculationsMode = () => {
        setScientificSymbolsArray(!ScientificSymbolsArray);
    };

    const clearHistory = () => {
        setPrevOperationsArray([]);
        clearLocalStorage();
    };

    return (
        <div>
            <button className={
                `${sideMenuStyles.sideMenuButton} ${sideMenuStyles.popupMenuButton} ${getStyleForButton(theme)} `}
                onClick={() => toggleMenu()} >
                {sideMenuIsOpen ? <TbSettingsOff className={getStyleForIcon(theme)} name="Settings" /> :
                    <TbSettings className={getStyleForIcon(theme)} name="Settings" />}
            </button>

            {sideMenuIsOpen && (
                <div className={sideMenuStyles.sideMenuContainer}>
                    <button className={getStyleForButton(theme)} onClick={() => toggleCalculationsMode()} name="Advanced Calculations">
                        <TbAdjustmentsCog className={getStyleForIcon(theme)} />
                    </button>
                    <button className={getStyleForButton(theme)} onClick={() => toggleTheme("light")} name="Light Mode">
                        <TbSunHigh className={getStyleForIcon(theme)} />
                    </button>
                    <button className={getStyleForButton(theme)} onClick={() => toggleTheme("dark")} name="Dark Mode">
                        <TbMoonFilled className={getStyleForIcon(theme)} />
                    </button>
                    <button className={getStyleForButton(theme)} onClick={() => clearHistory()} name="Clear History">
                        <TbHistoryOff className={getStyleForIcon(theme)} />
                    </button>
                    <AboutMenu theme={theme} />
                </div>
            )}
        </div>
    )
}

export default SideMenu;