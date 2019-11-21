import React from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from '../styles';

const data = [
  { name: 'STOPPED', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'PARKED', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'IMPEDIMENT', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'PROGRESSING', uv: 2780, pv: 3908, amt: 2000 },

];

const SimpleAreaChart = ({ classes, title }) => (
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
      <AreaChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  </Paper>
);

SimpleAreaChart.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(theme => styles(theme), {
  withTheme: true,
})(SimpleAreaChart);
