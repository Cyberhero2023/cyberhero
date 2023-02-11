import Mainframe from "./Mainframe";
import styles from "@/styles/Game.module.css";
import Bug from "./Bug";

export default function Game() {
	return (
		<div>
			<div className={styles.background}>
				{new Array(10).fill(0).map((_, i) => (
					<Bug key={i} position={Math.random() * 100} />
				))}
			</div>
			<Mainframe />
		</div>
	);
}
