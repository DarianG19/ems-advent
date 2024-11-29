import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import {useAuth} from "@/components/auth/AuthContext"; // Installiere: npm install jwt-decode

function isTokenExpired(token: string): boolean {
    try {
        const { exp } = jwtDecode<{ exp: number }>(token); // JWT dekodieren
        return Date.now() >= exp * 1000; // Ist die aktuelle Zeit >= Ablaufzeit?
    } catch {
        return true; // Fehler beim Dekodieren: Token gilt als abgelaufen
    }
}

export default function useAuthRedirect() {
    const { loading, setLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const storedToken = sessionStorage.getItem('jwt');

        if (!storedToken || isTokenExpired(storedToken)) {
            console.log("In useAuthRedirect")
            // Kein Token oder abgelaufener Token
            router.push('/login');
        } else {
            setLoading(false); // Ladezustand beenden
        }
    }, [router, setLoading]);

    return { loading, setLoading };
}

