import Image from "next/image";
import styles from "./page.module.css";

export default function Page() {
    return (
        <div className={styles.doorDetailsContainer}>
                <img src="/green.png" alt="Green" className={styles.green}/>
                <div className={styles.errorMessageContainer}>
                    <h1>Das Türchen darf noch nicht geöffnet werden</h1>
                    <Image src={"/dino.png"} alt={"Bad Dino"} width={279} height={300}/>
                </div>
        </div>
    );
}