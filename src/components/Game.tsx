import styles from "@/styles/Game.module.css";
import { useEffect, useState } from "react";
import Bug from "./Bug";
import Health from "./Health";
import Mainframe from "./Mainframe";
import Popup from "./Popup";

type GameProps = {
	setState: (state: GameStates) => void;
	paused: boolean;
	setPaused: (paused: boolean) => void;
};

export default function Game({ setState, paused, setPaused }: GameProps) {
	const [popup, setPopup] = useState(false);
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
	}, []);

	useEffect(() => {
		if (health <= 0) {
			setState("gameover");
		}
	}, [health, setState]);

	const bugs = positions?.map((position, i) => (
		<Bug
			key={i}
			health={health}
			setHealth={setHealth}
			position={position}
			speed={i * 0.00005 + 0.0005}
			showPopup={() => setPopup(true)}
			paused={paused}
		/>
	));

	return (
		<>
			{paused && <div className={styles.paused}>Paused</div>}
			<Popup question="test" show={popup} setShow={setPopup} />
			<div className={styles.background}>{bugs}</div>
			<Mainframe health={health} />
			<Health health={health} />
			<div className={styles.menu} onClick={() => setPaused(!paused)} />
		</>
	);
}
