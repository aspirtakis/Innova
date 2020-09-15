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
import KpnSelect from "./components/kpnSelect";
import KpnTextArea from "./components/kpnTextArea";

import "./onboardingStyle.css";

export function OnboardingForm() {
  useInjectReducer({ key: "onboardingForm", reducer });
  useInjectSaga({ key: "onboardingForm", saga });

  return (
    <div className="onboardingForms">
      <ul className="breadcrumb">
        <li className="breadcrumb__item"><a className="breadcrumb__link">Explore</a></li>
        <li className="breadcrumb__item"><a className="breadcrumb__link">5G brood toaster</a></li>
      </ul>

      <div className="row">
        <div className="col col--8">
          <form className="leftForm">
            <div className="leftFormContent">
              <div className="content__header">
                <h2 className="content__title">5G brood toaster</h2>
              </div>
              <div className="content__body">
                <dl className="dl">
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

              <div className="content__header">
                <h2 className="content__title">Idea specifications</h2>
              </div>
              <div className="content__body">
                <dl className="dl">
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

        <div className="col col--3">
          <form className="rightForm">
            <div className="content__header">
              <h2 className="content__title">Voting</h2>
            </div>
            <div className="content__body">
              <dl className="dl">
                <KpnSelect
                  title="Business opportunity">
                </KpnSelect>
                <KpnSelect
                  title="Clear user segment">
                </KpnSelect>
                <KpnSelect
                  title="Problem solving">
                </KpnSelect>
                <KpnSelect
                  title="KPN fit">
                </KpnSelect>
                <KpnSelect
                  title="Ticket fit">
                </KpnSelect>
                <KpnSmallText
                  title="Result"
                  description="160">
                </KpnSmallText>
              </dl>
            </div>
            <div className="content__body kpnNotesField">
              <dl className="dl">
                <KpnTextArea
                  title="Notes"
                  textArea="Briljant idea, must do this. Have to check with Arnoud, Bas and Eric for more information.">
                </KpnTextArea>
                <KpnTextArea
                  title="Comments for sender"
                  textArea="Hi Kevin, thanks for your idea. Great thinking. We bring your idea to the next phase. Love, Ewout">
                </KpnTextArea>
                <KpnSelect
                  title="Ticket fit">
                </KpnSelect>
                <button class="kpnNotesFieldButton button">Send</button>
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
