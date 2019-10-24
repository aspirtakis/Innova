import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import layoutStyles from 'containers/Layout/styles';
import PageBase from 'components/PageBase';

import styles from './styles';

class DashboardPage extends React.PureComponent {
  state = { loading: true };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 300);
  }

  render() {
    const { loading } = this.state;

    return (
      <PageBase title="Dashboard" minHeight={500} loading={loading}>
        {!loading && (
          <div>
            <Typography variant="h5">Welcome to the Dashboard</Typography>
          </div>
        )}
      </PageBase>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(
  theme => ({
    ...layoutStyles(theme),
    ...styles(theme),
  }),
  { withTheme: true },
)(DashboardPage);
