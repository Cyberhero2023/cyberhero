import styles from "@/styles/Popup.module.css";
import { useEffect, useRef } from "react";

type QuestionProps = {
	show: boolean;
	setShow: (show: boolean) => void;
	question: string;
};

export default function Popup({ show, setShow, question }: QuestionProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (show) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
	}, [show]);

	return (
		<dialog
			ref={ref}
			className={styles.dialog}
			style={{
				opacity: show ? 1 : 0,
			}}
		>
			<header className={styles.header}>
				<button onClick={() => setShow(false)}>
					<svg viewBox="0 0 100 100" width={24} height={24}>
						<line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth={10} strokeLinecap="round" />
						<line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth={10} strokeLinecap="round" />
					</svg>
				</button>
			</header>
		</dialog>
	);
}
