import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import './Home.css';

const categories = [
	'any',
	'general knowledge',
	'books',
	'film',
	'music',
	'musicals & theatre',
	'television',
	'video games',
	'board games',
	'science & nature',
	'computers',
	'mathematics',
	'mythology',
	'sports',
	'geography',
	'history',
	'politics',
	'art',
	'celebrities',
	'animals',
	'vehicles',
	'comics',
	'gadgets',
	'anime & manga',
	'cartoons & animations',
];
const difficulties = ['any', 'easy', 'medium', 'hard'];

const Home = () => {
	const [category, setCategory] = useState(0);
	const [difficulty, setDifficulty] = useState(0);
	const navigate = useNavigate();
	return (
		<section id="welcome-section">
			<h1>Quizzical</h1>
			<Dropdown
				label="category"
				options={categories}
				setChosenValue={setCategory}
			/>
			<Dropdown
				label="difficulty"
				options={difficulties}
				setChosenValue={setDifficulty}
			/>
			<button
				type="button"
				onClick={() =>
					navigate('/play', {
						state: { category: category, difficulty: difficulties[difficulty] },
					})
				}
			>
				Start quiz
			</button>
		</section>
	);
};

export default Home;
