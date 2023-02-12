import styles from "@/styles/Popup.module.css";
import { useEffect, useRef } from "react";
import questions from "@/questions";

type QuestionProps = {
	show: boolean;
	setShow: (show: boolean) => void;
	id: number;
};

export default function Popup({ show, setShow, id }: QuestionProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (show && !ref.current?.open) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
	}, [show]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const answer = event.currentTarget.answer.value;
		if (questions[id]?.answer.map(a => questions[id]?.options[a]).includes(answer)) {
			setShow(false);
		}
	};

	return (
		<dialog
			ref={ref}
			className={styles.dialog}
			style={{
				opacity: show ? 1 : 0,
			}}
		>
			<header className={styles.header}>
				<h1 className={styles.title}>{questions[id]?.question}</h1>
				<button onClick={() => setShow(false)}>
					<svg viewBox="0 0 100 100" width={24} height={24}>
						<line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth={10} strokeLinecap="round" />
						<line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth={10} strokeLinecap="round" />
					</svg>
				</button>
			</header>
			<main>
				<form onSubmit={handleSubmit}>
					<ul className={styles.answers}>
						{questions[id]?.options.map((answer, i) => (
							<li key={i}>
								<input
									type="radio"
									required
									className={styles.answer}
									name="answer"
									id={`answer-${i}`}
									value={answer}
								/>
								<label htmlFor={`answer-${i}`} className={styles.answer}>
									{answer}
								</label>
							</li>
						))}
					</ul>
					<button className={styles.submit}>Submit</button>
				</form>
			</main>
		</dialog>
	);
}
