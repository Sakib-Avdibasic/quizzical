import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Question from './Question';
import './GameScreen.css';

let controller;

const GameScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [chosenAnswers, setChosenAnswers] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [score, setScore] = useState(0);
	const { state } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		// if no question category and/or difficulty is set
		if (state === null) {
			return navigate('/');
		}
		controller = new AbortController();
		fetchQuestions();
		return () => controller.abort();
	}, []);

	const handleChange = e => {
		const questionIdx = +e.target.name.slice(-1);
		setChosenAnswers(chosenAnswers => {
			return { ...chosenAnswers, [questionIdx]: e.target.value };
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		setIsSubmitted(true);
		let cnt = 0;
		for (const [questionIdx, answer] of Object.entries(chosenAnswers)) {
			if (answer === questions[questionIdx].correct_answer) cnt++;
		}
		setScore(cnt);
	};

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

	return (
		<form onChange={handleChange} onSubmit={handleSubmit}>
			{isLoading ? (
				<i id="loader" className="centered" />
			) : (
				<>
					{questions.map((question, idx) => (
						<Question
							key={idx}
							details={question}
							questionIdx={idx}
							chosenAnswer={chosenAnswers[idx]}
							isSubmitted={isSubmitted}
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
										setChosenAnswers({});
									}}
								>
									Play again
								</button>
							</>
						) : (
							<button
								type="submit"
								disabled={Object.keys(chosenAnswers).length !== 5}
							>
								Check answers
							</button>
						)}
					</section>
				</>
			)}
		</form>
	);
};

export default GameScreen;
