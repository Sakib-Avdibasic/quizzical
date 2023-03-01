import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import lightSwitch from '../assets/light-switch.mp3';

const Header = ({ darkMode, setDarkMode }) => {
	return (
		<header>
			<nav>
				<NavLink
					to={'/'}
					className={({ isActive }) => (isActive ? 'active' : '')}
				>
					Home
				</NavLink>
			</nav>
			{/* <h3>
				<span style={{ fontWeight: 'normal' }}>Created by</span> Sakib Avdibašić
			</h3> */}
			<div id="dark-mode-chooser">
				<input
					type="checkbox"
					name="dark-mode"
					id="dark-mode"
					value={darkMode}
					onChange={e => {
						setDarkMode(!darkMode);
						const audio = new Audio(lightSwitch);
						audio.volume = 0.2;
						audio.play();
					}}
				></input>
				<label htmlFor="dark-mode">
					<FontAwesomeIcon
						icon={darkMode ? faSun : faMoon}
						color={darkMode ? '#f17022' : '#91a3b0'}
						fontSize="20"
					/>
				</label>
			</div>
		</header>
	);
};

export default Header;
