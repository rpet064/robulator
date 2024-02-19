import { TbHistory } from "react-icons/tb"
import colours from '../styles/Colours.module.css'
import { useState, FC } from 'react'
import HistoryMenuModal from './HistoryMenuModal'
import sideMenuStyles from '../styles/SideMenu.module.css'

interface HistorySideMenuProps {
    theme: string
}

const HistorySideMenu: FC<HistorySideMenuProps> = ({ theme }) => {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false)
    const toggleMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen)
    }

    return (
        <div>
            <button className={`${sideMenuStyles.historySideMenuButton} ${sideMenuStyles.popupMenuButton} 
            ${theme === "light" ? colours.darkButton : colours.lightButton}`}
                onClick={() => toggleMenu()}
            >
                {!isSideMenuOpen && <TbHistory className={theme === "light" ? colours.lightIcon : colours.darkIcon} />}
                <HistoryMenuModal isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen} />
            </button>
        </div>
    )
}

export default HistorySideMenu