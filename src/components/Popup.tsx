import styles from "@/styles/Popup.module.css";

type QuestionProps = {
	value: string;
};

export default function Popup({ question }: QuestionProps) {
	return (
		<dialog open className={styles.background}/>
	);
}