import { FC, useEffect, useState } from 'react'
import Modal from 'react-modal'
import modalStyles from '../styles/ModalStyles.module.css'
import useWindowSize from './utility/windowSize'
import colours from '../styles/Colours.module.css'
import ModalFooter from './ModalFooter'

Modal.setAppElement('#__next')

interface HistoryMenuProps {
    isSideMenuOpen: boolean
    setIsSideMenuOpen: (value: boolean) => void
    prevOperationsArray: string[]
}

const HistoryMenuModal: FC<HistoryMenuProps> = ({
    isSideMenuOpen,
    setIsSideMenuOpen, 
    prevOperationsArray
}) => {

    const { width } = useWindowSize()
    const [modalWidth, setModalWidth] = useState<string>('47.5%')
    const [modalHeight, setModalHeight] = useState<string>('85%')
    const [modalInset, setModalInset] = useState<string>('40px')

    useEffect(() => {
        if (width <= 1200) {
            setModalWidth('85%')
        } else {
            setModalWidth('50%')
        }
    }, [width])

    useEffect(() => {
        if (width <= 768) {
            setModalHeight('97.5%')
        } else {
            setModalHeight('85%')
        }
    }, [width])

    useEffect(() => {
        if (width <= 568) {
            setModalInset('1px')
        } else {
            setModalInset('40px')
        }
    }, [width])

    return (
        <div>
            <Modal
                isOpen={isSideMenuOpen}
                onRequestClose={() => setIsSideMenuOpen(false)}
                contentLabel="History menu modal"
                style={{
                    content: {
                        width: modalWidth,
                        height: modalHeight,
                        margin: 'auto',
                        padding: '0px',
                    }
                }}
            >
                <div className={` ${modalStyles.modalHeader} ${colours.blueBackground} ${colours.lightText}`}>
                    <p>History</p>
                    <button className={`${modalStyles.closeModalButton} ${colours.lightText}`} onClick={() => setIsSideMenuOpen(false)}>X</button>
                </div>

                <div className={modalStyles.modalBody}>
                    {prevOperationsArray.map((previousOperation, index) => {
                        return (
                            <div key={index}>
                                <p>{previousOperation}</p>
                            </div>
                        )
                    })}
                    {prevOperationsArray.length <  1 && <p> No calculations yet </p>}
                </div>
                <ModalFooter />
            </Modal>
        </div>
    )
}

export default HistoryMenuModal