import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from "@material-ui/core/styles";
import {
    Paper,
    Typography,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Avatar,
    List,
    ListItem,
    ListItemText,
    IconButton
  } from "@material-ui/core";
import ProdPageInfo from '../components/Product/ProdPageInfo';
import ProdInfoCard from '../components/Product/ProdInfoCard';

const styles = theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'space-around',
    paddingTop: "10%"
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    alignContent: 'space-between',
  },
  image: {
    width: "100%",
    paddingBottom: 20
  }
});


const Product = ({ classes }) => (
    <MuiThemeProvider>
    <div>
      <div className={classes.background} />
      <Grid container spacing={24} className={classes.container}>
        <Grid item xs={4} className={classes.leftContainer}>
        <img className={classes.image} src="https://pixel.nymag.com/imgs/fashion/daily/2019/01/14/14-lady-gaga.w700.h700.jpg"></img>
          <Card className={classes.card}>
            <Grid container>

              <LeftContainer classes={classes} />
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <Grid container>
              <RightContainer classes={classes} />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
    </MuiThemeProvider>
  );

  const RightContainer = ({ classes }) => (
    <Grid className={classes.heightAdjust} item xs={9}>
    <ProdPageInfo price="10"/>
    </Grid>
  );

  const LeftContainer = ({ classes }) => (
    <Grid className={classes.heightAdjust} item xs={9}>
    <ProdInfoCard name="TV" description="lalalalaal" />
    </Grid>
  );

export default withStyles(styles)(Product);