import styles from "@/styles/Game.module.css";
import { useEffect, useRef, useState } from "react";
import Bug from "./Bug";
import Health from "./Health";
import Mainframe from "./Mainframe";
import Popup from "./Popup";
import questions from "@/questions";

type GameProps = {
	setState: (state: GameStates) => void;
	paused: boolean;
	setPaused: (paused: boolean) => void;
};

export default function Game({ setState, paused, setPaused }: GameProps) {
	const audio = useRef<HTMLAudioElement>(null);
	const [popup, setPopup] = useState(false);
	const [positions, setPositions] = useState<number[]>(
		new Array(5).fill(0).map((_, i) => Math.floor(Math.random() * 10) + i * 20),
	);
	const [health, setHealth] = useState(100);
	const [questionIndex, setQuestionIndex] = useState(0);
	const mutedRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const audioInteraction = () => {
			if (audio.current) {
				audio.current.play();
			}
		};

		window.addEventListener("click", audioInteraction);
		window.addEventListener("touchstart", audioInteraction);
		window.addEventListener("keydown", audioInteraction);
		window.addEventListener("pointermove", audioInteraction);
		return () => {
			window.removeEventListener("click", audioInteraction);
			window.removeEventListener("touchstart", audioInteraction);
			window.removeEventListener("keydown", audioInteraction);
			window.removeEventListener("pointermove", audioInteraction);
		};
	}, [paused]);

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
			<audio ref={audio} src="/mew.mp3" autoPlay loop />
			{paused && (
				<nav className={styles.paused} aria-label="Paused">
					<h2>Paused</h2>
					<span>Press SPACE to continue</span>
					<button className={styles.play} onClick={() => setPaused(!paused)} />
				</nav>
			)}
			<Popup
				show={popup}
				setShow={setPopup}
				question={questions[questionIndex]}
				nextQuestion={() => setQuestionIndex(questionIndex + 1)}
				removeBug={() => setPositions(positions => positions?.slice(1))}
			/>
			<div className={styles.background}>{bugs}</div>
			<Mainframe health={health} />
			<Health health={health} />
			<nav className={styles.menu} aria-label="Menu">
				<button
					className={styles.audio}
					ref={mutedRef}
					onClick={() => {
						if (!audio.current) return;
						audio.current.muted = !audio.current?.muted;
						if (!mutedRef.current) return;
						mutedRef.current.style.backgroundImage = `url("/${
							audio.current?.muted ? "muted" : "audio"
						}.svg")`;
					}}
				/>
				<button className={styles.home} onClick={() => setState("menu")} />
				<button className={styles.pause} onClick={() => setPaused(!paused)} />
			</nav>
		</>
	);
}
