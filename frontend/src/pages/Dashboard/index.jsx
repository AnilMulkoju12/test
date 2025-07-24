import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import './styles.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h6">Total Clients</Typography>
              <Typography variant="h4">145</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">87</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h4">$12,000</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
