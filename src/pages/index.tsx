import styles from "@/styles/Home.module.css";
import { M_PLUS_Code_Latin } from "@next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import logo from "../assets/logo.svg";
import Game from "@/components/Game";

const font = M_PLUS_Code_Latin({ subsets: ["latin"] });

export default function Home() {
	const [loading, setLoading] = useState(true);

	setTimeout(() => {
		setLoading(false);
	}, 200);

	return (
		<>
			<Head>
				<title>Cypher Hero</title>
				<meta name="description" content="A game for teaching cybersecurity to kids." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${styles.main} ${font.className}`}>
				{loading ? (
					<>
						<Image
							src={logo}
							alt="Cyber Hero Logo"
							width={200}
							height={200}
							className={styles.logo}
							priority
						/>
						<h2 className={styles.loadingText}>Loading...</h2>{" "}
					</>
				) : (
					<Game />
				)}
			</main>
		</>
	);
}
