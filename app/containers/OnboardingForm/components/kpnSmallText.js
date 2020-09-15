/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../onboardingStyle.css';

class KpnSmallText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: null,

		};
	}

	render() {
		const { title, description } = this.props;

		return (
			<div>
				<dt className="kpnSmallTextTitle">{title}</dt>
				<dd className="kpnSmallTextDescription">{description}</dd>
			</div>
		);
	}
}

export default KpnSmallText;