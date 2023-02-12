import styles from "@/styles/Game.module.css";
import { useEffect, useState } from "react";
import Bug from "./Bug";
import Health from "./Health";
import Mainframe from "./Mainframe";
import Popup from "./Popup";

type GameProps = {
	setState: (state: "playing" | "menu" | "gameover") => void;
};

export default function Game({ setState }: GameProps) {
	const [positions, setPositions] = useState<number[]>(
		new Array(5).fill(0).map((_, i) => Math.floor(Math.random() * 10) + i * 20),
	);
	const [health, setHealth] = useState(100);

	useEffect(() => {
		setInterval(() => {
			setPositions(positions => {
				if (!positions) return [Math.random() * 100];
				const newPositions = [...positions];
				newPositions.push(Math.floor(Math.random() * 10) * 10);
				return newPositions;
			});
		}, 10000);

		if (health <= 0) {
			setState("gameover");
		}
	}, [health, setState]);

	const bugs = positions?.map((position, i) => (
		<Bug key={i} position={position} health={health} setHealth={setHealth} speed={i * 0.00005 + 0.0005} />
	));

	const pause = () => {
		alert("Game paused. Press OK to continue.")
	};

	return (
		<div>
			<Popup question="test" />
			<div className={styles.background}>{bugs}</div>
			<Mainframe health={health} />
			<Health health={health} />
			<div className={styles.menu} onClick={pause} />
		</div>
	);
}
