import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GameScreen from './components/GameScreen';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
	const [darkMode, setDarkMode] = useState(
		() => JSON.parse(localStorage.getItem('darkMode')) || false
	);

	useEffect(() => {
		localStorage.setItem('darkMode', darkMode);
	}, [darkMode]);

	return (
		<Router>
			<div id="wrapper" className={darkMode ? 'dark-mode' : ''}>
				<Header darkMode={darkMode} setDarkMode={setDarkMode} />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/play" element={<GameScreen />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
