/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../agenda.css';

class FundingSmall extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: null,

		};
	}

	render() {
		const { title, cval, smallInputValue,types } = this.props;

		return (
			<React.Fragment>
				<dt className="smallInputTitle">{title}</dt>
				<div className="fundingInputField">
					<i className="ui-euro fundingEuroSign" />
					<dd className="smallInputField">
						<input
							className="input"
	
							value={cval}
							onChange={(e) => smallInputValue(e.target.value)}>
						</input>
					</dd>
				</div>
			</React.Fragment>
		);
	}
}

export default FundingSmall;
