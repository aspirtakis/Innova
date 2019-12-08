import React from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from '../styles';

const data = [
  { name: 'API-STORE', ppl: 3, actions: 8 },
  { name: 'MOBUILE-CONNECT', ppl: 3, actions: 5 },
  { name: 'CBAAS', ppl: 6, actions: 12 },
  { name: 'BLOCKCHAIN', ppl: 9, actions: 18 },
];

const SimpleBarChart = ({ classes, title }) => (
  <Paper
    style={{ width: '100%', height: 400, padding: '30px 30px 30px 0px' }}
    square
  >
    <Typography
      gutterBottom
      variant="h2"
      className={classes.title}
      style={{ paddingLeft: 20, marginBottom: 10 }}
    >
      {title}
    </Typography>
    <ResponsiveContainer>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ppl" fill="#8884d8" />
        <Bar dataKey="actions" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </Paper>
);

SimpleBarChart.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(theme => styles(theme), {
  withTheme: true,
})(SimpleBarChart);
