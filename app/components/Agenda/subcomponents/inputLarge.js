/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../agenda.css';

class InputLarge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: null,

		};
	}

	render() {
		const { title, placeholder, largeInputValue ,cval} = this.props;

		return (
			<React.Fragment>
				<dt className="largeInputTitle">{title}</dt>
				<dd className="largeInputField" >
					<textarea 
					className="textarea"
					placeholder={placeholder}
					value={cval}
					onChange={(e) => largeInputValue(e.target.value)}
					></textarea>
				</dd>
			</React.Fragment>
		);
	}
}

export default InputLarge;
