import styles from "@/styles/Popup.module.css";
import { useEffect, useRef, useState } from "react";
import questions from "@/questions";

type QuestionProps = {
	show: boolean;
	setShow: (show: boolean) => void;
	question: typeof questions[number];
	nextQuestion: () => void;
	removeBug: () => void;
};

export default function Popup({ show, setShow, question, nextQuestion, removeBug }: QuestionProps) {
	const ref = useRef<HTMLDialogElement>(null);
	const [wrongAnswer, setWrongAnswer] = useState(false);

	useEffect(() => {
		if (show && !ref.current?.open) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
	}, [show]);

	const reset = () => {
		setShow(false);
		nextQuestion();
		ref.current?.querySelectorAll("input").forEach(input => (input.checked = false));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const answer = event.currentTarget.answer.value;
		if (wrongAnswer) {
			setWrongAnswer(false);
			reset();
			return;
		}

		if (Object.values(question.options).indexOf(answer) === question.answer) {
			removeBug();
			reset();
		} else {
			setWrongAnswer(true);
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
				<h1 className={styles.title}>{question?.question}</h1>
				<button onClick={() => setShow(false)}>
					<svg viewBox="0 0 100 100" width={24} height={24}>
						<line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth={10} strokeLinecap="round" />
						<line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth={10} strokeLinecap="round" />
					</svg>
				</button>
			</header>
			<main>
				<form onSubmit={handleSubmit}>
					<ul className={styles.answers}>
						{question.options.map((answer, i) => (
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
					{wrongAnswer && <p>{question.explanation}</p>}
					<button className={styles.submit}>{wrongAnswer ? "Next" : "Submit"}</button>
				</form>
			</main>
		</dialog>
	);
}
