/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../agenda.css';

class TextSmall extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: null,

		};
	}

	render() {
		const { title, description} = this.props;

		return (
			<React.Fragment>
				<dt className="smallTextTitle">{title}</dt>
				<dd className="smallTextField">
					{description}
				</dd>
			</React.Fragment>
		);
	}
}

export default TextSmall;
