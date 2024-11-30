import {isAuthenticaed} from "@/utils/auth";
import {redirect} from "next/navigation";

export default async function NotFound() {
    const isAuthenticated = await isAuthenticaed();

    if (!isAuthenticated) {
        redirect('/login');
    }

    return (
        <div className={"not-found-container"}>
            <h1>404 - Diese Seite existiert leider nicht 💀</h1>
            <h3>Sooowwwyyy</h3>
        </div>
    );
}