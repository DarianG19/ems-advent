'use client';

import { AuthProvider } from './AuthContext';

export default function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}
