/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../ideaOnboardingFormStyles.css';

class KpnLargeInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: null,

		};
	}

	render() {
		const { title, largeInputValue } = this.props;

		return (
			<div>
				<dt className="kpnLargeInputTitle">{title}</dt>
				<dd className="kpnLargeInputField">
					<textarea
						className="textarea"
						onChange={(e) => largeInputValue(e.target.value)}>
					</textarea>
				</dd>
			</div>
		);
	}
}

export default KpnLargeInput;