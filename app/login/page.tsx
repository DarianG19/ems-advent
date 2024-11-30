"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
                credentials: "include", // Cookies automatisch senden und empfangen
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            // Nach erfolgreichem Login zur Startseite weiterleiten
            router.push("/");
        } catch (error) {
            console.error(error);
            setError("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1>Ems Advent 🦆 🎅🏻</h1>
            <div className={styles.loginCard}>
                <h1>Login</h1>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div className={styles.loginControl}>
                        <label>Benutzername</label>
                        <input
                            type="text"
                            placeholder="Benutzername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.loginControl}>
                        <label>Passwort</label>
                        <input
                            type="password"
                            placeholder="Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
