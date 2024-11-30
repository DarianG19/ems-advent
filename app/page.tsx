import styles from './page.module.css';
import Image from "next/image";
import Card from "@/components/Cards";
import {redirect} from "next/navigation";
import LogoutButton from "@/components/LogoutButton/page";
import {isAuthenticaed} from "@/utils/auth";

const colorPalette = {
    red: "#DA2C38",
    darkGreen: "#226F54",
    green: "#87C38F",
    yellow: "#F4F0BB",
    purple: "#A3A1C9",
}

const picUrls = [
    "/santa.png",
    "/snowman.png",
    "/merry-christmas-tree.png",
    "/gifts.png",
    "/effect.png",
]

export default async function Home() {
    const isAuthenticated = await isAuthenticaed();

    if (!isAuthenticated) {
        redirect('/login');
    }

  return (
      <div className={styles.homeContainer}>
          <div className={styles.headerContainer}>
              <div className={styles.imageContainer}>
                  <Image src="/darinodino2.png" alt="DarinoDino" height={300} width={228}/>
              </div>
              <h1>Adventskalender</h1>
              <h1>🎁 2024 🎁</h1>
          </div>
          <div className={styles.cardGridContainer}>
              <Card doorNumber={1} format={"square"} imgUrl={picUrls[3]} color={colorPalette.green}/>
              <Card doorNumber={2} format={"square"} imgUrl={picUrls[4]} color={colorPalette.red}/>
              <Card doorNumber={3} format={"wide"} imgUrl={picUrls[0]} color={colorPalette.yellow}/>
              <Card doorNumber={4} format={"large"} imgUrl={picUrls[1]} color={colorPalette.darkGreen}/>
              <Card doorNumber={5} format={"square"} imgUrl={picUrls[2]} color={colorPalette.red}/>
              <Card doorNumber={6} format={"square"} imgUrl={picUrls[0]} color={colorPalette.purple}/>
              <Card doorNumber={7} format={"wide"} imgUrl={picUrls[1]} color={colorPalette.green}/>
              <Card doorNumber={8} format={"large"} imgUrl={picUrls[2]} color={colorPalette.yellow}/>
              <Card doorNumber={9} format={"square"} imgUrl={picUrls[3]} color={colorPalette.red}/>
              <Card doorNumber={10} format={"square"} imgUrl={picUrls[4]} color={colorPalette.purple}/>
                <Card doorNumber={11} format={"wide"} imgUrl={picUrls[0]} color={colorPalette.green}/>
                <Card doorNumber={12} format={"large"} imgUrl={picUrls[1]} color={colorPalette.yellow}/>
                <Card doorNumber={13} format={"square"} imgUrl={picUrls[2]} color={colorPalette.red}/>
                <Card doorNumber={14} format={"square"} imgUrl={picUrls[3]} color={colorPalette.purple}/>
                <Card doorNumber={15} format={"large"} imgUrl={picUrls[4]} color={colorPalette.green}/>
                <Card doorNumber={16} format={"wide"} imgUrl={picUrls[0]} color={colorPalette.yellow}/>
                <Card doorNumber={17} format={"square"} imgUrl={picUrls[1]} color={colorPalette.red}/>
                <Card doorNumber={18} format={"square"} imgUrl={picUrls[2]} color={colorPalette.purple}/>
                <Card doorNumber={19} format={"square"} imgUrl={picUrls[3]} color={colorPalette.green}/>
                <Card doorNumber={20} format={"square"} imgUrl={picUrls[4]} color={colorPalette.yellow}/>
                <Card doorNumber={21} format={"wide"} imgUrl={picUrls[0]} color={colorPalette.red}/>
                <Card doorNumber={22} format={"square"} imgUrl={picUrls[1]} color={colorPalette.purple}/>
                <Card doorNumber={23} format={"square"} imgUrl={picUrls[2]} color={colorPalette.green}/>
                <Card doorNumber={24} format={"large"} imgUrl={picUrls[3]} color={colorPalette.yellow}/>
          </div>
          <hr />
          <LogoutButton />
      </div>
  );
}
