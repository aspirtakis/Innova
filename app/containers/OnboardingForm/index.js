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
        <div class="col col--7">
          <form class="leftForm">
            <div class="content__header">
              <h2 class="content__title">5G brood toaster</h2>
            </div>
            <div class="content__body">
              <dl class="dl">
                <dt>Name</dt>
                <dd>Kevin Quint</dd>
                <dt>Email address</dt>
                <dd>kevin.quint@kpn.com</dd>
                <dt>Department</dt>
                <dd>ZM 5G</dd>
              </dl>
            </div>

            <div class="content__header">
              <h2 class="content__title">Idea specifications</h2>
            </div>
            <div class="content__body">
              <dl class="dl">
                <dt>Name</dt>
                <dd>Brood toaster met 5G</dd>
                <dt>Idea code</dt>
                <dd>1234</dd>
                <dt>Idea pitch</dt>
                <dd>
                  <p class="p">
                    This toaster will give us an incredible amount of money within
                    a short time because everybody loves toast. Trust me. I asked
                    my neighbor and he wanted to buy this. Boom!
                    Validated.
                  </p>
                </dd>
                <dt>Clear user segment</dt>
                <dd>
                  <p class="p">
                    This toaster will give us an incredible amount of money within
                    a short time because everybody loves toast.
                  </p>
                </dd>
                <dt>Problem solution</dt>
                <dd>
                  <p class="p">
                    This toaster will give us an incredible amount of money within
                    a short time because everybody loves toast. Trust me. I asked
                    my neighbor and he wanted to buy this. Boom!
                    Validated.
                  </p>
                </dd>
                <dt>KPN fit</dt>
                <dd>
                  <p class="p">
                    This toaster will give us an incredible amount of money within
                    a short time because everybody loves toast. Trust me. I asked
                    my neighbor and he wanted to buy this. Boom!
                    Validated.
                  </p>
                </dd>
                <dt>Ticket fit</dt>
                <dd>
                  <p class="p">
                    This toaster will give us an incredible amount of money within
                    a short time because everybody loves toast. Trust me. I asked
                    my neighbor and he wanted to buy this. Boom!
                    Validated.
                  </p>
                </dd>
              </dl>
            </div>

          </form>
        </div>

        <div class="col col--3">
          <form class="rightForm">
            
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
