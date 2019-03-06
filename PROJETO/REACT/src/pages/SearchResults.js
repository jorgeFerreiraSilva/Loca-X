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
    const { classes } = this.props;
    const results = [
      {
        name: 'Lady Gaga',
        price: '10000',
        description: 'Oscar Winner',
        image: 'https://cdn.cliqueinc.com/cache/posts/269360/lady-gaga-malibu-home-269360-1538670263859-main.700x0c.jpg'
      },
      {
        name: 'aaa',
        price: '30',
        description: 'nbbbbb',
        image: 'https://cdn.cliqueinc.com/cache/posts/269360/lady-gaga-malibu-home-269360-1538670263859-main.700x0c.jpg'
      }
    ];
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
