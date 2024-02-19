import { useState, FC } from "react"
import { FiHelpCircle } from 'react-icons/fi';
import AboutMenuModal from "./AboutMenuModal"
import colours from '../styles/Colours.module.css'

interface AboutMenuProps {
    theme: string
  }

const AboutMenu: FC<AboutMenuProps> = ({
        theme,
        }) => {

    const [aboutMenuIsOpen, setAboutMenuIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setAboutMenuIsOpen(!aboutMenuIsOpen)
    }

    return(
        <div>
            <button className={theme === "light" ? colours.darkButton : colours.lightButton} 
            onClick={() => toggleMenu()}>
                <FiHelpCircle className={theme === "light" ? colours.lightIcon : colours.darkIcon}/>
                <AboutMenuModal aboutMenuIsOpen={aboutMenuIsOpen} setAboutMenuIsOpen={setAboutMenuIsOpen}/>
            </button>
        </div>
    )
}

export default AboutMenu