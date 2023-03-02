import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Question from './Question';
import './GameScreen.css';

const GameScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [score, setScore] = useState(0);
	const { state } = useLocation();
	console.log(state);

	const fetchQuestions = () => {
		setIsLoading(true);
		axios
			.get(
				`https://opentdb.com/api.php?amount=5&type=multiple${
					state.category > 0 ? `&category=${+state.category + 8}` : ''
				}${state.difficulty !== 'any' ? `&difficulty=${state.difficulty}` : ''}`
			)
			.then(response => {
				setQuestions(response.data.results);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchQuestions();
	}, []);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				setIsSubmitted(true);
				const date = new Date();
				localStorage.setItem(
					'lastPlayed',
					`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				);
			}}
		>
			{isLoading ? (
				<i id="loader" className="centered" />
			) : (
				<>
					{questions.map((q, idx) => (
						<Question
							key={idx}
							details={q}
							questionIdx={idx + 1}
							isSubmitted={isSubmitted}
							setScore={setScore}
						/>
					))}
					<section id="result-area">
						{isSubmitted ? (
							<>
								<p>You answered {score}/5 questions correctly</p>
								<button
									type="button"
									onClick={e => {
										fetchQuestions();
										setIsSubmitted(false);
										setScore(0);
									}}
								>
									Play again
								</button>
							</>
						) : (
							<button type="submit">Check answers</button>
						)}
					</section>
				</>
			)}
		</form>
	);
};

export default GameScreen;
