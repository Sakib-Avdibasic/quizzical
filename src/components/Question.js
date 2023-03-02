import { useEffect, useState } from 'react';
import './Question.css';
import { decode } from 'html-entities';

const Question = ({ details, questionIdx, chosenAnswer, isSubmitted }) => {
	const [answers, setAnswers] = useState([]);
	const correctAnswer = decode(details.correct_answer);

	useEffect(() => {
		setAnswers([
			...details.incorrect_answers.splice(0, Math.floor(Math.random() * 4)),
			correctAnswer,
			...details.incorrect_answers,
		]);
	}, []);

	return (
		<section
			className={`question-area ${
				isSubmitted
					? chosenAnswer === correctAnswer
						? 'correct'
						: 'incorrect'
					: ''
			}`}
		>
			<h2>{decode(details.question)}</h2>
			<div className="answers">
				{answers.map((answer, idx) => {
					answer = decode(answer);
					return (
						<div
							key={idx}
							className={
								isSubmitted
									? answer === correctAnswer
										? answer === chosenAnswer
											? 'correct'
											: 'correct not-selected'
										: answer === chosenAnswer
										? 'incorrect'
										: 'not-selected'
									: answer === chosenAnswer
									? 'selected'
									: ''
							}
						>
							<input
								type="radio"
								name={`question${questionIdx}`}
								id={answer}
								value={answer}
								required
								disabled={isSubmitted}
								className="centered"
							></input>
							<label htmlFor={answer}>{answer}</label>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Question;
