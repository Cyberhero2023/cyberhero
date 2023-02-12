import styles from "@/styles/Bug.module.css";
import { useEffect, useState } from "react";

const CENTER = 50;

type BugProps = {
	speed: number;
	health: number;
	setHealth: (health: number) => void;
	/** Position is a number between 0 and 100 where 0 is the top left corner, 25 is the top right corner, 50 is the bottom right corner, and 75 is the bottom left corner. */
	position: number;
};

export default function Bug({ health, setHealth, position, speed }: BugProps) {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [moving, setMoving] = useState<boolean | null>(null);
	const [timeOffset] = useState(Math.random() * 5000);
	const [rotation, setRotation] = useState(0);
	const [size] = useState(Math.random() * 0.5 + 0.5);

	useEffect(() => {
		if (y == 0 && x == 0) {
			switch (Math.floor(position / 25)) {
				case 0:
					setX(position * 4);
					break;
				case 1:
					setX(100);
					setY((position - 25) * 4);
					break;
				case 2:
					setX((position - 50) * 4);
					setY(100);
					break;
				case 3:
					setY((position - 75) * 4);
					break;
			}
		}

		setRotation((Math.atan2(CENTER - y, CENTER - x) * 180) / Math.PI + 90);

		if (moving === null) {
			setMoving(true);
		} else if (moving === false) {
			return;
		}

		// Move towards the center of the screen
		const interval = setInterval(() => {
			if (Math.abs(CENTER - x) < 15 && Math.abs(CENTER - y) < 15) {
				setMoving(false);
				clearInterval(interval);
				if (health > 0) setHealth(health - 5);
			}
			setX(x + (CENTER - x) * speed);
			setY(y + (CENTER - y) * speed);
		}, 1000 / 60);

		return () => {
			clearInterval(interval);
			clearInterval(interval);
		};
	}, [health, moving, position, setHealth, speed, timeOffset, x, y]);

	return (
		<div
			className={styles.bug}
			style={
				{
					"--size": `${size}`,
					"--size-rem": `${size / 10}rem`,
					"--x": `calc(max(${x}vw - var(--size-rem) * 2, -1 * var(--size-rem)))`,
					"--y": `calc(max(${y}vh - var(--size-rem) * 2, -1 * var(--size-rem)))`,
					"--rotation": `${rotation}deg`,
					opacity: moving ? 1 : 0,
				} as React.CSSProperties
			}
		/>
	);
}
