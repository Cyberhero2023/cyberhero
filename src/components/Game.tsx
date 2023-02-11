import styles from "@/styles/Game.module.css";
import { useState } from "react";
import Bug from "./Bug";
import Health from "./Health";
import Mainframe from "./Mainframe";

export default function Game() {
	const [positions] = useState<number[]>(new Array(10).fill(0).map((_, i) => Math.floor(Math.random() * 5) + i * 10));
	const [health, setHealth] = useState(100);

	return (
		<div>
			<div className={styles.background}>
				{positions.map((position, i) => (
					<Bug key={i} position={position} health={health} setHealth={setHealth} />
				))}
			</div>
			<Mainframe />
			<Health health={health} />
		</div>
	);
}
