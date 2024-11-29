'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {Door} from "@/app/doors/page";
import styles from './page.module.css';


export default function Page({ params }: { params: { slug: string } }) {
    const [door, setDoor] = useState<Door | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDoor = async () => {
            try {
                const token = sessionStorage.getItem('jwt');

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doors/${params.slug}`, {
                    headers: {
                        'x-auth-token': token ? token : '',
                    },
                });

                if (!response.ok) {
                    if (response.status === 400) {
                        return router.push('/no-access');
                    }
                    throw new Error('Failed to fetch door');
                }

                const data = await response.json();
                setDoor(data);
            } catch (error) {
                console.error(error);
                router.push('/error');
            }
        };

        fetchDoor();
    }, [params.slug, router]);

    const collectDoor = async () => {
        const token = sessionStorage.getItem('jwt');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doors/collect/${params.slug}`, {
            method: 'POST',
            headers: {
                'x-auth-token': token ? token : '',
            },
        });
        if (!response.ok) {
            console.error('Failed to collect door');
            return;
        }
        router.push('/doors');
    }

    return (
        <div className={styles.doorDetailsContainer}>
            <img src="/green.png" alt="Green" className={styles.green} />
            <h1>{+params.slug < 10 ? `0${params.slug}` : params.slug}</h1>
            <div className={styles.doorDetailsCard}>
                <p>{door?.title}</p>
                <p>{door?.description}</p>
                <button
                    className={`${styles.collectButton} ${door?.collected ? styles.collected : ''}`}
                    onClick={collectDoor}
                    disabled={door?.collected}
                >
                    {door?.collected ? 'Gesammelt' : 'Einsammeln!'}{' '}
                    {door?.collected && <i className={'bi bi-check'}></i>}
                </button>
            </div>
            <img src="/merry-christmas-tree.png" alt="Christmas Tree" className={styles.christmasTree} />
        </div>
    );
}
