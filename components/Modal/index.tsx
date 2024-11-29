import styles from './modal.module.css';
import Image from "next/image";

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    day: number;
}

export default function Modal({ show, handleClose, day }: ModalProps) {
    if (!show) {
        return null; // Modal wird nicht angezeigt, wenn `show` false ist
    }

    return (
        <div className={styles.overlayStyles}>
            <div className={styles.modalStyles}>
                <div className={styles.headerStyles}>
                    <h2>Ne ne ne... ☝️</h2>
                    <button onClick={handleClose} className={styles.closeButtonStyles}>
                        X
                    </button>
                </div>
                <div className={styles.bodyStyles}>
                    <div className={styles.imageContainer}>
                        <Image src="/dino.png" alt="Enttäuschter Dino" height={161} width={150}/>
                    </div>
                    <p>Heute ist noch nicht der <strong>{day}. Dezember</strong>. Du musst dich noch ein bisschen gedulden :)</p>
                </div>
                <div className={styles.footerStyles}>
                    <button onClick={handleClose} className={styles.actionButtonStyles}>
                        Na gut
                    </button>
                </div>
            </div>
        </div>
    );
}