import React, {createContext, useContext, useEffect, useState} from 'react';
import { useRouter} from "next/navigation";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = sessionStorage.getItem('jwt');
        if (!storedToken || isTokenExpired(storedToken)) {
            setLoading(false);
            router.push('/login'); // Redirect bei fehlender Authentifizierung
        } else {
            setLoading(false);
        }
    }, [router]);

    return (
        <AuthContext.Provider value={{ loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

function isTokenExpired(token: string): boolean {
    try {
        const { exp } = jwtDecode<{ exp: number }>(token); // JWT dekodieren
        return Date.now() >= exp * 1000; // Ist die aktuelle Zeit >= Ablaufzeit?
    } catch {
        return true; // Fehler beim Dekodieren: Token gilt als abgelaufen
    }
}