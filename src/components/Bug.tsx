import styles from "@/styles/Bug.module.css";
import { useEffect, useRef, useState } from "react";

type BugProps = {
	/** Position is a number between 0 and 100 where 0 is the top left corner, 25 is the top right corner, 50 is the bottom right corner, and 75 is the bottom left corner. */
	position: number;
};

export default function Bug({ position }: BugProps) {
	const speed = 0.005;
	const center = 50;

	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [moving, setMoving] = useState(false);
	const [timeOffset] = useState(Math.random() * 500);
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

		setRotation((Math.atan2(center - y, center - x) * 180) / Math.PI + 90);

		const timeout = setTimeout(() => {
			setMoving(true);
		}, timeOffset * 10);

		// Move towards the center of the screen
		if (!moving) return;

		const interval = setInterval(() => {
			if (Math.abs(center - x) < 10 && Math.abs(center - y) < 10) {
				setMoving(false);
			}
			setX(x + (center - x) * speed);
			setY(y + (center - y) * speed);
		}, 1000 / 60);

		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		};
	}, [moving, position, timeOffset, x, y]);

	return (
		<div
			className={styles.bug}
			style={
				{
					"--size": `${size}`,
					"--size-rem": `${size / 10}rem`,
					"--x": `calc(max(${x}vw - var(--size-rem) * 2, -1 * var(--size-rem)))`,
					"--y": `calc(max(${y}vh - var(--size-rem) * 2, -1 * var(--size-rem)))`,
					"--time-offset": `${timeOffset}ms`,
					"--rotation": `${rotation}deg`,
					opacity: moving ? 1 : 0,
				} as React.CSSProperties
			}
		/>
	);
}
