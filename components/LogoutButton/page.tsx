'use client';

import { useRouter } from 'next/navigation';
import styles from './logoutbutton.module.css';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include', // Cookies automatisch senden
            });

            if (!response.ok) {
                throw new Error('Failed to logout');
            }

            // Weiterleitung zur Login-Seite
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button onClick={handleLogout} className={styles.logoutButton}>
            Abmelden
        </button>
    );
}
