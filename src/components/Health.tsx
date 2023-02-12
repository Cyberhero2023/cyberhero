import styles from "../styles/Health.module.css";

type HealthProps = {
	health: number;
};

export default function Health({ health }: HealthProps) {
	return (
		<div className={styles.health}>
			<div className={styles.healthFill} style={{ width: `${health}%` }} />
			<div className={styles.healthFill} style={{ width: `${100 - health}%` }} />
		</div>
	);
}
