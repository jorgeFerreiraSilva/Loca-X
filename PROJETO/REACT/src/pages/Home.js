import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import SelectState from '../components/SelectState';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      margin: '20%',
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
});

class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
        <div>
          <Header />
          <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs></Grid>
            <Grid item xs={6}>
             <Paper className={classes.paper}>
               <SelectState />
             </Paper>
            </Grid>
            <Grid item xs></Grid>
           </Grid> 
          </div>
        </div>
        );
      }
  }
  
Home.propTypes = {
classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);