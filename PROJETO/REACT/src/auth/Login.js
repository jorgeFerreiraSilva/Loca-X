import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MyButton from '../components/MyButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

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

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      showPassword: false,
    };
    this.service = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    console.log(this.state)
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleFormSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
      .then(response => {
        console.log('<-------------------- RESPONSE -------------------->');
        console.log(response);
        console.log('<-------------------- RESPONSE -------------------->');

        this.setState({ username: "", password: "" });
        this.props.getUser(response)
      })
      .catch(error => console.log(error))
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs></Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form onSubmit={this.handleFormSubmit}>
                <TextField
                  id="outlined-simple-start-adornment"
                  className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  onChange={this.handleChange('username')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">E-mail</InputAdornment>,
                  }} />
                <TextField
                  id="outlined-adornment-password"
                  className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  type={this.state.showPassword ? 'text' : 'password'}
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  InputProps={
                    {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                          >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>)
                    }}
                />
                <MyButton text="Submit" />
                <input type="submit" value="submit" />
              </form>
            </Paper>
            <Link to="/adicionar">
              <MyButton text="buscar" />
            </Link>
            <Link to="/reservas/dono">
              <MyButton text="reservas dono" />
            </Link>
            <Link to="/reservas/inq">
              <MyButton text="reservas inquilino" />
            </Link>
            <Link to="/user/5c841808a4d1b52e327bb042">
              <MyButton text="profile" />
            </Link>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Login);

