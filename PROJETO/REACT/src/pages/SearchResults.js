import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MyCard from '../components/MyCard';
import Header from '../components/Header';

const styles = theme => ({
  root: {
    padding: '0 85px',
    marginTop: 20,
    justifyContent: 'flex-start'
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class SearchResults extends Component {
  render() {
    const { classes, results } = this.props;
    return (
      <div className={classes.root}>
        <Grid
        container
        justify="flex-start"
        spacing={16}
      >
        {results.map((
          result,
          index
        ) => (
          <Grid key={index} item>
            {' '}
            <MyCard result={result} />
          </Grid>
        ))}
      </Grid>
      </div>
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchResults);
