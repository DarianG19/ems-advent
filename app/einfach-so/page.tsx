import styles from './page.module.css';
import {redirect} from "next/navigation";
import Image from "next/image";
import {isAuthenticaed} from "@/utils/auth";

export default async function Page() {
    const isAuthenticated = await isAuthenticaed();

    if (!isAuthenticated) {
        redirect('/login');
    }

    return (
        <div className={styles.einfachSoContainer}>
            <h1>Soooo Ems <sup className={styles.footnoteRef}>1</sup></h1>
            <p className={styles.description}>Da du mir auch einen Adventskalender geschenkt hast, dachte ich, es wäre eine coole Idee, wenn ich meinen
                kleinen Informatiker raushängen lasse und dir auch was Kleines bastle. Du kannst die Türchen einsammeln
                und dann später bei mir zu Hause abholen ;)</p>
            <Image src={"/toad.png"} alt={"Toad Showing Tongue"} width={571} height={571}/>
            <footer className={styles.footnote}>
                <p>
                    <sup>1</sup> Meine Hauptmaus ♥️
                </p>
            </footer>
        </div>
    );
}