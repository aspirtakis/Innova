/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../ideaOnboardingFormStyles.css';

class KpnSmallInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: null,

		};
	}

	render() {
		const { title } = this.props;

		return (
			<div>
				<dt className="kpnSmallInputTitle">{title}</dt>
				<dd className="kpnSmallInputField">
					<input className="input" type="text"></input>
				</dd>
			</div>
		);
	}
}

export default KpnSmallInput;