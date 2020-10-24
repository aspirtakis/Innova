/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../agenda.css';

class InputSmall extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: null,

		};
	}

	render() {
		const { title, inputType, placeholder, cval, smallInputValue } = this.props;

		return (
			<React.Fragment>
				<dt className="smallInputTitle">{title}</dt>
				<dd className="smallInputField">
					<input
						className="input"
						type={inputType}
						placeholder={placeholder}
						value={cval}
						onChange={(e) => smallInputValue(e.target.value)}>
					</input>
				</dd>
			</React.Fragment>
		);
	}
}

export default InputSmall;
