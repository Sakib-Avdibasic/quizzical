import { useEffect, useState } from 'react';
import './Question.css';
import { decode } from 'html-entities';

const Question = ({ details, questionIdx, isSubmitted, setScore }) => {
	const [answers, setAnswers] = useState([]);
	const [chosenAns, setChosenAns] = useState();
	const [correctAns, setCorrectAns] = useState();

	useEffect(() => {
		setCorrectAns(Math.floor(Math.random() * 4));
	}, []);

	useEffect(() => {
		setAnswers([
			...details.incorrect_answers.splice(0, correctAns),
			details.correct_answer,
			...details.incorrect_answers,
		]);
	}, [correctAns]);

	useEffect(() => {
		if (isSubmitted && chosenAns == correctAns) setScore(score => score + 1);
	}, [isSubmitted]);

	return (
		<section
			className={`question-area ${
				isSubmitted ? (chosenAns === correctAns ? 'correct' : 'incorrect') : ''
			}`}
		>
			<h2>{decode(details.question)}</h2>
			<div className="answers">
				{answers.map((a, idx) => (
					<div
						key={idx}
						className={
							isSubmitted
								? idx === correctAns
									? idx === chosenAns
										? 'correct'
										: 'correct not-selected'
									: idx === chosenAns
									? 'incorrect'
									: 'not-selected'
								: idx === chosenAns
								? 'selected'
								: ''
						}
					>
						<input
							type="radio"
							name={`question${questionIdx}`}
							id={a}
							value={a}
							required
							disabled={isSubmitted}
							onClick={() => setChosenAns(idx)}
							className="centered"
						></input>
						<label htmlFor={a}>{decode(a)}</label>
					</div>
				))}
			</div>
		</section>
	);
};

export default Question;
