"use client";
import styles from './cards.module.css';
import {useEffect, useState} from "react";
import Modal from "@/components/Modal";
import {useRouter} from "next/navigation";

export default function Card({ doorNumber, format, imgUrl, color }: Readonly<{ doorNumber: number, format: string, imgUrl: string, color: string }>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const otis = true;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const checkDate = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        if (day >= doorNumber && month === 12 || otis) {
            router.push(`/doors/${doorNumber}`);
            return;
        }
        openModal();
        return;
    }

    const checkForLocked = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        if (day >= doorNumber && month === 12) {
            return "";
        }
        return styles.cardLocked;
    }

    const checkIfSantaOrEffect = () => {
        if (imgUrl === "/santa.png") {
            return styles.bottomCenter;
        }

        if (imgUrl === "/effect.png") {
            return styles.cardEffectBg;
        }

        return "";
    }

    const checkIfUrlNeeded = () => {
        if (imgUrl === "/effect.png") {
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    return (
        <>
            <div style={{backgroundColor: color}} onClick={checkDate} className={`${styles.card} ${styles[`card-${format}`]} ${checkIfSantaOrEffect()} ${checkForLocked()}`}>
                <div className={styles.cardHeader}>
                    <span>{doorNumber < 10 ? `0${doorNumber}` : doorNumber}</span>
                    <i className={"bi bi-arrow-right"}></i>
                </div>
                {checkIfUrlNeeded() && <img src={imgUrl} alt={`Türchen ${doorNumber} Picture`} />}
            </div>
            <Modal show={isModalOpen} handleClose={closeModal} day={doorNumber} />
        </>
    );
}