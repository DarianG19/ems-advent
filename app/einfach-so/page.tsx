import styles from './page.module.css';
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function isAuthenticaed(): Promise<boolean> {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt')?.value;

    if (!token) {
        return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Cookie: token ? `jwt=${token}` : '',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    return response.ok;
}

export default async function Page() {
    const isAuthenticated = await isAuthenticaed();

    if (!isAuthenticated) {
        redirect('/login');
    }

    return (
        <div className={styles.einfachSoContainer}>
            <h1>Einfach so ein bisschen Text</h1>
            <p>Das ist einfach so</p>
        </div>
    );
}