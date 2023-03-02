import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from 'react-router-dom';
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
			<img src="https://purepng.com/public/uploads/large/purepng.com-witcher-geralt-of-riviawitcherthe-witcherandrzej-sapkowskiwriterfantasy-serieswitcher-geralt-of-riviawitchersbooksmonster-hunterssupernaturaldeadly-beastsseriesvideo-gamesxbox-1701528660783gykhu.png"></img>
			<h1>Geralt of Trivia</h1>
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
