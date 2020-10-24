/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../votingFormStyles.css';

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
        <dt className="kpnLongTextTitle">{title}</dt>
        <dd>
          <p className="kpnLongTextDescription p">
            {description}
          </p>
        </dd>
      </div>
    );
  }
}

export default KpnLongText;
