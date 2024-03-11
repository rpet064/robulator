import { FC, useEffect, useState } from 'react';
import Modal from 'react-modal';
import modalStyles from '../styles/ModalStyles.module.css';
import useWindowSize from './utility/windowSize';
import colours from '../styles/Colours.module.css';
import ModalFooter from './ModalFooter';
import { HistoryMenuProps } from './utility/interfacePropsManager';

Modal.setAppElement('#__next');

const HistoryMenuModal: FC<HistoryMenuProps> = ({
    isSideMenuOpen,
    setIsSideMenuOpen, 
    prevOperationsArray
}) => {

    const { width } = useWindowSize();
    const [modalWidth, setModalWidth] = useState<string>('47.5%');
    const [modalHeight, setModalHeight] = useState<string>('85%');
    const [modalInset, setModalInset] = useState<string>('40px');

    useEffect(() => {
        if (width <= 1200) {
            setModalWidth('85%');
        } else {
            setModalWidth('50%');
        }
    }, [width]);

    useEffect(() => {
        if (width <= 768) {
            setModalHeight('97.5%');
        } else {
            setModalHeight('85%');
        }
    }, [width]);

    useEffect(() => {
        if (width <= 568) {
            setModalInset('1px');
        } else {
            setModalInset('40px');
        }
    }, [width]);

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
                    <button className={`${modalStyles.closeModalButton} ${colours.lightText}`} 
                    onClick={() => setIsSideMenuOpen(false)}>X</button>
                </div>

                <div className={modalStyles.modalBody}>
                    <div className={modalStyles.card}>
                        <ul>
                    {prevOperationsArray.map((previousOperation, index) => {
                        return (
                            <li className={modalStyles.cardItem} key={index}>{previousOperation}</li>
                        )
                    })}
                    {prevOperationsArray.length <  1 && <li> No calculations yet </li>}
                        </ul>
                    </div>
                </div>
                <ModalFooter />
            </Modal>
        </div>
    )
}

export default HistoryMenuModal;