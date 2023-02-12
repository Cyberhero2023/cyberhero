import styles from "@/styles/Mainframe.module.css";

type HealthProps = {
	health: number;
};

export default function Mainframe({ health }: HealthProps) {
	return (
		<div className={styles.mainframe} style={
			{
				background: `url(/server${Math.ceil(health/33.33)}.svg) no-repeat center`
			}
		}/>
	);
}
