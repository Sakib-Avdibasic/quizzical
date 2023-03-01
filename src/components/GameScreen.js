import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Question from './Question';
import './GameScreen.css';

const controller = new AbortController();

const GameScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [score, setScore] = useState(0);
	const { state } = useLocation();

	const fetchQuestions = () => {
		setIsLoading(true);
		const category =
			state.category > 0 ? `&category=${+state.category + 8}` : '';
		const difficulty =
			state.difficulty !== 'any' ? `&difficulty=${state.difficulty}` : '';
		axios
			.get(
				`https://opentdb.com/api.php?amount=5&type=multiple${category}${difficulty}`,
				{ signal: controller.signal }
			)
			.then(response => {
				setQuestions(response.data.results);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchQuestions();
		return () => controller.abort();
	}, []);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				setIsSubmitted(true);
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
							questionIdx={idx}
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
