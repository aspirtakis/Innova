/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../agenda.css';

class Avatar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: null,

		};
	}

	render() {
		const { avatarImage } = this.props;

		return (
			<img className="avatar" src={avatarImage} alt="Avatar" />
		);
	}
}

export default Avatar;
