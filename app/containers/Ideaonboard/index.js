/**
 *
 * Ideaonboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Col,
  FormFeedback,
  FormGroup,
  FormGroupActionButton,
  FormGroupInput,
  Input,
  Label,
  LabelFor,
  Row,
} from '@kpn-style/react';
import makeSelectIdeaonboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './idea.css';


export function Ideaonboard() {
  useInjectReducer({ key: 'ideaonboard', reducer });
  useInjectSaga({ key: 'ideaonboard', saga });

  return (
    <Row>
      <Col xs={3}>
        <form>
        <div className="voting">
        <h3>Voting</h3>
        </div>



          <Label>Bussiness oportunity</Label>
          <Input type="select">
            <option value="ar">1</option>
            <option value="nl">2</option>
          </Input>

     


          <h3>Input with icon action button</h3>


          <h3>Inline components using Row asnd Col</h3>
          <Row>
            <Col xs={12} s={3}>
              <Input placeholder="Enter your first name" />
            </Col>
            <Col xs={12} s={3}>
              <Input placeholder="Enter your last name" />
            </Col>
          </Row>
          <h3>Text Area</h3>
          <Label>Datas</Label>
          <Input type="textarea">Lorem ipsum</Input>
        </form>
      </Col>

      <Col xs={5}>
        <form>
          <h3>Text input with placeholder and label</h3>
          <Label>Name</Label>
          <Input placeholder="Enter your first name" />

          <h3>Select</h3>
          <Label>Country</Label>
          <Input type="select">
            <option value="ar">Argentina</option>
            <option value="nl">Netherlands</option>
          </Input>

          <h3>Text Area</h3>
          <Label>Data</Label>
          <Input type="textarea">Lorem ipsum</Input>


          <h3>Input with icon action button</h3>


          <h3>Inline components using Row and Col</h3>
          <Row>
            <Col xs={12} s={3}>
              <Input placeholder="Enter your first name" />
            </Col>
            <Col xs={12} s={3}>
              <Input placeholder="Enter your last name" />
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  );
}

Ideaonboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ideaonboard: makeSelectIdeaonboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Ideaonboard);
