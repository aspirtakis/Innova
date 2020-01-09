/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from '../styles';

const COLORS = ['green', 'yellow', 'orange', 'red'];

const RADIAN = Math.PI / 180;


const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const PiesChart = ({
  classes, title, data, color,
}) => (
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
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine
          label={renderCustomizedLabel}
          outerRadius={120}
          fill={color}
        >
          {
        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
      }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </Paper>
);

PiesChart.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(theme => styles(theme), {
  withTheme: true,
})(PiesChart);
