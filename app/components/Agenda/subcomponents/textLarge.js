/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../agenda.css';

class TextLarge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: null,

		};
	}

	render() {
		const { title, description } = this.props;

		return (
			<React.Fragment>
				<dt className="largeTextTitle">{title}</dt>
				<dd className="largeTextField" >
					{description}
				</dd>
			</React.Fragment>
		);
	}
}

export default TextLarge;
