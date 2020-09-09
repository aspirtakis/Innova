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
                <dt>{title}</dt>
                <dd className="kpnSmallText">{description}</dd>
            </div>
        );
    }
}

export default KpnSmallText;