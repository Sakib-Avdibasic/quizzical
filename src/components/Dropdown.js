const Dropdown = ({ label, options, setChosenValue }) => {
	return (
		<div className="dropdown">
			<label htmlFor={label}>Choose your {label}</label>
			<select
				name={label}
				id={label}
				onChange={e => setChosenValue(e.target.value)}
			>
				{options.map((option, idx) => (
					<option key={idx} value={idx}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default Dropdown;
