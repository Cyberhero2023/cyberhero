import styles from "@/styles/Home.module.css";
import { M_PLUS_Code_Latin } from "@next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Game from "@/components/Game";

const font = M_PLUS_Code_Latin({ subsets: ["latin"] });

export default function Home() {
	const [state, setState] = useState<"menu" | "playing" | "gameover">("menu");

	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				setState("playing");
			}
		};
		window.addEventListener("keydown", handleKeydown);
		return () => window.removeEventListener("keydown", handleKeydown);
	}, []);

	return (
		<>
			<Head>
				<title>Cyber Hero</title>
				<meta name="description" content="A game for teaching cybersecurity to kids." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon shortcut" href="/logo.svg" />
			</Head>
			<main className={`${styles.main} ${font.className}`}>
				{state === "menu" && (
					<>
						<Image
							src="/logo.svg"
							alt="Cyber Hero Logo"
							width={250}
							height={250}
							className={styles.logo}
							priority
						/>
						<button className={styles.button} onClick={() => setState("playing")}>
							Start
						</button>
					</>
				)}
				{state === "playing" && <Game setState={setState} />}
				{state === "gameover" && (
					<>
						<Image
							src="/logo.svg"
							alt="Cyber Hero Logo"
							width={250}
							height={250}
							className={styles.logo}
							priority
						/>
						<h2 className={styles.heading}>Game Over</h2>
						<button className={styles.button} onClick={() => setState("playing")}>
							Restart
						</button>
					</>
				)}
			</main>
		</>
	);
}
