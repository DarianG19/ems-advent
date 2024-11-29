"use client";
import styles from './navigation.module.css';
import { useRouter, usePathname } from "next/navigation";

export default function NavigationBar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (index: number, path: string) => {
        router.push(path);
    };

    return (
        <nav className={styles.navigationBar}>
            <ul>
                <li
                    className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}
                    onClick={() => handleClick(0, '/')}
                >
                    Adventskalender
                </li>
                <li
                    className={`${styles.navItem} ${pathname === '/doors' ? styles.active : ''}`}
                    onClick={() => handleClick(1, '/doors')}
                >
                    Truhe
                </li>
                <li
                    className={`${styles.navItem} ${pathname === '/einfach-so' ? styles.active : ''}`}
                    onClick={() => handleClick(2, '/einfach-so')}
                >
                    Einfach so
                </li>
            </ul>
        </nav>
    );
}