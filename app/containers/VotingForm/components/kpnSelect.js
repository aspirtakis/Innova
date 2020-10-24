/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../votingFormStyles.css';

class KpnSelect extends React.Component {
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
        <dt className="kpnSelectTitle">{title}</dt>
        <select className="kpnSelectSelector select">
          <option hidden disabled selected value> 1 - 5 </option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    );
  }
}

export default KpnSelect;
