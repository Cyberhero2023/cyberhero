import styles from "@/styles/Home.module.css";
import { M_PLUS_Code_Latin } from "@next/font/google";
import Head from "next/head";
import Image from "next/image";
import logo from "../assets/logo.svg";

const font = M_PLUS_Code_Latin({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>uOttaHack Project</title>
				<meta name="description" content="uOttaHack Project" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${styles.main} ${font}`}>
				<Image src={logo} alt="CSE Logo" width={200} height={200} className={styles.logo} />
				<h2 className={styles.loadingText}>Loading...</h2>
			</main>
		</>
	);
}
