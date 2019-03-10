/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid
} from '@material-ui/core';

const styles = theme => ({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'center'
  },
  image: {
    width: '100%'
  },
  box: {
    marginTop: '10%'
  },
  boxContent: {
    padding: '10%'
  }
});

class ProdInfoCard extends Component {
    render() {
      const { classes } = this.props;
      return (
  
      <MuiThemeProvider>
        <div>
          <Grid className={classes.container}>
          <img className={classes.image} src={this.props.image}></img>
          <Paper square className={classes.box}>
          <div className={classes.boxContent}>
          <Typography variant="h6" component="h2">
            {this.props.name}
          </Typography>
          <hr></hr>
          <Typography component="p">
            <h3>{this.props.description}</h3>
          </Typography>
          </div>
          </Paper>
          </Grid>
        </div>
      </MuiThemeProvider>
  
      );
    }
  }

  ProdInfoCard.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(ProdInfoCard);
