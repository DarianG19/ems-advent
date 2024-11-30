'use client';

import { useRouter } from 'next/navigation';
import styles from './collectbutton.module.css';

export default function ClientCollectButton({
    slug,
    collected,
}: {
    slug: number;
    collected: boolean;
}) {
    const router = useRouter();

    const collectDoor = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doors/collect/${slug}`, {
                method: 'POST',
                credentials: 'include', // JWT wird automatisch im Cookie gesendet
            });

            if (!response.ok) {
                throw new Error('Failed to collect door');
            }

            // Nach erfolgreichem Einsammeln Seite aktualisieren
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            className={`${styles.collectButton} ${collected ? styles.collected : ''}`}
            onClick={collectDoor}
            disabled={collected}
        >
            {collected ? 'Gesammelt' : 'Einsammeln!'}{' '}
            {collected && <i className={'bi bi-check'}></i>}
        </button>
    );
}
