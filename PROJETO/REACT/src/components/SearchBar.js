import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import Search from '@material-ui/icons/Search'


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

class SearchBar extends Component {
    render() {
        const { classes } = this.props;
        return (
        <div>
          <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs></Grid>
            <Grid item xs={6}>
             <Paper className={classes.paper}>
             <TextField
          id="standard-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">
            <Search />
            </InputAdornment>,
          }}
        />
             </Paper>
            </Grid>
            <Grid item xs></Grid>
           </Grid> 
          </div>
        </div>
        );
      }
  }
  
  SearchBar.propTypes = {
classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SearchBar);