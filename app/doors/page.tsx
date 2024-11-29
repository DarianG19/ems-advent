"use client";
import styles from './doors.module.css';
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

export interface Door {
    day: number;
    title: string;
    description: string;
    imageUrl: number;
    collected: boolean;
}

export default function Page() {
    const [doors, setDoors] = useState<Door[]>([]);

    useEffect(() => {
        const fetchDoors = async () => {
            try {
                const token = sessionStorage.getItem('jwt');
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doors/collected`, {
                    headers: {
                        'x-auth-token': token ? token : '',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch doors');
                }
                const data = await response.json();
                setDoors(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDoors();
    }, []);
    return (
        <div className={styles.chestContainer}>
            <Image src={"/Giant_Chest.png"} alt={"Truhe"} height={200} width={197}/>
            <h1>Übersicht</h1>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>No.</th>
                        <th><i style={{fontSize: "1.5rem"}} className={"bi bi-check"}></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {doors.map((door, index) => (
                        <tr key={index}>
                            <td>
                                <Link href={`/doors/${door.day}`}>
                                    <span>{door.title}</span>
                                    <i className={"bi bi-box-arrow-up-right"}></i>
                                </Link>
                            </td>
                            <td>{door.day}</td>
                            <td><i style={{fontSize: "1.5rem"}} className={"bi bi-check"}></i></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}