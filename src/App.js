import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GameScreen from './components/GameScreen';

const App = () => {
	return (
		<Router>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/play" element={<GameScreen />} />
				</Routes>
			</main>
		</Router>
	);
};

export default App;
