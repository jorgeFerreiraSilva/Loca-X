import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid,
  Card
} from '@material-ui/core';
import Details from '../components/Product/Details';
import ProdInfoCard from '../components/Product/ProdInfoCard';

const styles = theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'space-around',
    paddingTop: '10%'
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    alignContent: 'space-between',
  },
  image: {
    width: '100%',
    paddingBottom: 20
  }
});


const Product = ({ classes }) => (
  <MuiThemeProvider>
    <div>
      <div className={classes.background} />
      <Grid container spacing={24} className={classes.container}>
        <Grid item xs={4} className={classes.leftContainer}>
          <LeftContainer classes={classes} />
        </Grid>
        <Grid item xs={4}>
          <RightContainer classes={classes} />
        </Grid>
      </Grid>
    </div>
  </MuiThemeProvider>
);

const RightContainer = ({ classes }) => (
  <Details price="10" />
);

const LeftContainer = ({ classes }) => (
  <ProdInfoCard image="https://pixel.nymag.com/imgs/fashion/daily/2019/01/14/14-lady-gaga.w700.h700.jpg" name="TV" description="lalalalaal" />
);

export default withStyles(styles)(Product);