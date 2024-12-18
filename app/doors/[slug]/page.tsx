import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from "next/image";
import styles from './page.module.css';
import ClientCollectButton from "@/components/ClientButton/ClientCollectButton";
import {Door} from "@/utils/interfaces";

async function fetchDoor(slug: string): Promise<Door | null> {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt')?.value;

    if (!token) {
        redirect('/login'); // Weiterleitung bei fehlendem Token
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doors/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Cookie: token ? `jwt=${token}` : '',
        },
        credentials: 'include',
        cache: 'no-store', // Keine Daten aus dem Cache verwenden
    });

    if (response.status === 400) {
        redirect('/no-access'); // Weiterleitung bei nicht verfügbarem Türchen
    }

    if (!response.ok) {
        redirect('/login'); // Weiterleitung bei Serverfehler
    }

    return response.json();
}


export default async function Page({ params }: { params: { slug: string } }) {
    const door = await fetchDoor(params.slug); // Türchen-Daten abrufen
    console.log(door?.title);

    if (!door) {
        redirect('/not-found'); // Weiterleitung, falls keine Daten gefunden wurden
    }

    // Server-seitiges Rendern der Seite
    return (
        <div className={styles.doorDetailsContainer}>
            <img src="/green.png" alt="Green" className={styles.green} />
            <h1>{+params.slug < 10 ? `0${params.slug}` : params.slug}</h1>
            <div className={styles.doorDetailsCard}>
                <h2>{door.title}</h2>
                <p>{door.description}</p>
                <Image src={door.imageUrl} alt={door.title} width={200} height={200} />
                <form method="POST" action={`/doors/collect/${params.slug}`}>
                    <ClientCollectButton slug={door.day} collected={door.collected} />
                </form>
            </div>
            <img src="/merry-christmas-tree.png" alt="Christmas Tree" className={styles.christmasTree} />
        </div>
    );
}
