/**
 *
 * OnboardingForm
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectOnboardingForm from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

import KpnLongText from "./components/kpnLongText";
import KpnSmallText from "./components/kpnSmallText";

import "./onboardingStyle.css";

export function OnboardingForm() {
  useInjectReducer({ key: "onboardingForm", reducer });
  useInjectSaga({ key: "onboardingForm", saga });

  return (
    <div class="onboardingForms">
      <ul class="breadcrumb">
        <li class="breadcrumb__item"><a class="breadcrumb__link">Explore</a></li>
        <li class="breadcrumb__item"><a class="breadcrumb__link">5G brood toaster</a></li>
      </ul>

      <div class="row">
        <div class="col col--8">
          <form class="leftForm">
            <div class="leftFormContent">
              <div class="content__header">
                <h2 class="content__title">5G brood toaster</h2>
              </div>
              <div class="content__body">
                <dl class="dl">
                  <KpnSmallText
                    title="Name"
                    description="Kevin Quint">
                  </KpnSmallText>
                  <KpnSmallText
                    title="Email address"
                    description="kevin.quint@kpn.com">
                  </KpnSmallText>
                  <KpnSmallText
                    title="Department"
                    description="ZM 5G">
                  </KpnSmallText>
                </dl>
              </div>

              <div class="content__header">
                <h2 class="content__title">Idea specifications</h2>
              </div>
              <div class="content__body">
                <dl class="dl">
                <KpnSmallText
                    title="Name"
                    description="Brood toaster met 5G">
                  </KpnSmallText>
                  <KpnSmallText
                    title="Idea code"
                    description="1234">
                  </KpnSmallText>
                  <KpnLongText
                    title="Idea pitch"
                    description="This toaster will give us an incredible amount of money withing a short time because
                     everybody loves toast. Trust me. I asked my neighbor and he wanted to buy this. Boom!
                     Validated.">
                  </KpnLongText>
                  <KpnLongText
                    title="Clear user segment"
                    description="This toaster will give us an incredible amount of money withing a short time because
                    everybody loves toast. Trust me. I asked my neighbor and he wanted to buy this. Boom!
                    Validated.">
                  </KpnLongText>
                  <KpnLongText
                    title="Problem Solution"
                    description="This toaster will give us an incredible amount of money withing a short time because
                    everybody loves toast. Trust me. I asked my neighbor and he wanted to buy this. Boom!
                    Validated.">
                  </KpnLongText>
                  <KpnLongText
                    title="KPN fit"
                    description="This toaster will give us an incredible amount of money withing a short time because
                    everybody loves toast. Trust me. I asked my neighbor and he wanted to buy this. Boom!
                    Validated.">
                  </KpnLongText>
                  <KpnLongText
                    title="Ticket fit"
                    description="This toaster will give us an incredible amount of money withing a short time because
                    everybody loves toast. Trust me. I asked my neighbor and he wanted to buy this. Boom!
                    Validated.">
                  </KpnLongText>
                </dl>
              </div>
            </div>
          </form>
        </div>

        <div class="col col--3">
          <form class="rightForm">
            <div class="content__header">
              <h2 class="content__title">Voting</h2>
            </div>
            <div class="content__body">
              <dl class="dl">
                <dt>Business opportunity</dt>
                <dd>
                  <select class="select">
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </dd>
                <dt>Clear user segment</dt>
                <dd>
                  <select class="select">
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </dd>
                <dt>Problem solving</dt>
                <dd>
                  <select class="select">
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </dd>
                <dt>KPN fit</dt>
                <dd>
                  <select class="select">
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </dd>
                <dt>Ticket fit</dt>
                <dd>
                  <select class="select">
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option>DDT</option>
                    <option>NGI</option>
                    <option>TC</option>
                  </select>
                </dd>
                <dt>Result</dt>
                <dd>160</dd>
              </dl>
            </div>
            <div class="content__body">
              <dl class="dl">
                <dt>Notes</dt>
                <dd>
                  <textarea class="textarea">
                    Briljant idea, must do this. Have to check with Arnoud, Bas and Eric for more information.
                  </textarea>
                </dd>
                <dt>Comments for sender</dt>
                <dd>
                  <textarea class="textarea">
                    Hi Kevin,
                    Thanks for your idea. Great thinking. We bring your idea to the next phase.
                    Love, Ewout
                  </textarea>
                </dd>
                <dt>Next phase</dt>
                <dd>
                  <select class="select">
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option>Option 1</option>
                    <option>Backlog</option>
                    <option>Option 3</option>
                  </select>
                </dd>
                <button class="button">Send</button>
              </dl>
            </div>
          </form>

        </div>
      </div>
    </div >
  );
}

OnboardingForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  onboardingForm: makeSelectOnboardingForm()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(OnboardingForm);
