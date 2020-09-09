/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../onboardingStyle.css';

class KpnLongText extends React.Component {
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
        <dd>
          <p class="p">
            {description}
          </p>
        </dd>
      </div>
    );
  }
}

export default KpnLongText;
