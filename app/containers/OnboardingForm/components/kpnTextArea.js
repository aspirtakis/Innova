/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../onboardingStyle.css';

class KpnTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: null,

    };
  }

  render() {
    const { title, textArea } = this.props;

    return (
      <div>
        <dt className="kpnTextAreaTitle">{title}</dt>
        <dd>
          <textarea className="kpnTextAreaDescription textarea">
            {textArea}
          </textarea>
        </dd>
      </div>
    );
  }
}

export default KpnTextArea;
