import React, { Component } from "react";
import axios from 'axios';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "../components/Header";
import AuthService from "./auth-service";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "20%",
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      state: "",
      username: "",
      password: ""
    };
    this.updateState = this.updateState.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.service = new AuthService();
  }

  updateState(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { username, password, name, state } = this.state;
    const { getUser } = this.props;
    this.service.signup(username, password, name, state)
      .then((response) => {
        this.setState({
          username: '',
          password: '',
          state: '',
          name: ''
        });
        getUser(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <div>
                <form onSubmit={this.handleFormSubmit}>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Name</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            onChange={e => this.updateState(e)}
                            value={this.state.name}
                            type="text"
                            placeholder="Name"
                            name="name"
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Região</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            onChange={e => this.updateState(e)}
                            value={this.state.state}
                            type="text"
                            placeholder="Estado"
                            name="state"
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">E-mail</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            onChange={e => this.updateState(e)}
                            value={this.state.username}
                            type="text"
                            placeholder="E-mail"
                            name="username"
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Password</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            onChange={e => this.updateState(e)}
                            value={this.state.password}
                            type="text"
                            placeholder="Password"
                            name="password"
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <input type="submit" value="submit" />
                </form>
              </div>
            </Paper>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Signup);
