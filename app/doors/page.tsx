import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './doors.module.css';

export interface Door {
    day: number;
    title: string;
    description: string;
    imageUrl: number;
    collected: boolean;
}

async function fetchDoors(): Promise<Door[]> {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt')?.value;

    if (!token) {
        redirect('/login'); // Weiterleitung bei fehlendem Token
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doors/collected`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Cookie: token ? `jwt=${token}` : '',
        },
        credentials: 'include',
        cache: 'no-store', // Daten nicht cachen, immer neu laden
    });

    if (!response.ok) {
        redirect('/login'); // Optional: Weiterleitung bei fehlgeschlagener Datenabfrage
    }

    return response.json();
}

export default async function Page() {
    const doors = await fetchDoors(); // Daten serverseitig abrufen

    return (
        <div className={styles.chestContainer}>
            <Image src="/Giant_Chest.png" alt="Truhe" height={200} width={197} />
            <h1>Übersicht</h1>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>No.</th>
                        <th>
                            <i style={{ fontSize: '1.5rem' }} className={'bi bi-check'}></i>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {doors.map((door, index) => (
                        <tr key={index}>
                            <td>
                                <Link href={`/doors/${door.day}`}>
                                    <span>{door.title}</span>
                                    <i className={'bi bi-box-arrow-up-right'}></i>
                                </Link>
                            </td>
                            <td>{door.day}</td>
                            <td>
                                <i style={{ fontSize: '1.5rem' }} className={'bi bi-check'}></i>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
