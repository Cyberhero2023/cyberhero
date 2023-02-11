import Mainframe from "./Mainframe";
import styles from "@/styles/Game.module.css";
import Bug from "./Bug";
import { Key, useState } from "react";

export default function Game() {
	const [positions] = useState<number[]>(new Array(10).fill(0).map((_, i) => Math.floor(Math.random() * 5) + i * 10));

	return (
		<div>
			<div className={styles.background}>
				{positions.map((position, i) => (
					<Bug key={i} position={position} />
				))}
			</div>
			<Mainframe />
		</div>
	);
}
