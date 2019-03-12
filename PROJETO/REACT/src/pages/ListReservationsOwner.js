import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  }
});


class ListReservationsOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userReservations: []
    };
  }

  componentDidMount() {
    this.setState({ userId: this.props.loggedInUser._id});

    axios.get(`http://192.168.0.41:8080/api/reservation/owner/${this.props.loggedInUser._id}`)
      .then((response) => {
        const userReservations = response.data;
        this.setState({ userReservations });
        console.log(userReservations);
      })
      .catch(err => console.log(err));
  }

  render () {
    return(
      <div>
        <Grid
          container
          justify="flex-start"
          spacing={16}
        >
        <h1>mari esteve aqui</h1>
          { (this.state.userReservations !== null) ?      
            (this.state.userReservations.map((item, index) => (
              <Grid key={index} item>
                {item.title}
                Datas: {item.startDate} -> {item.endDate}
                Preço: {item.totalPrice}
                Status: {item.status}
                <Link to={{
                pathname: `/reservas/dono/${item._id}`,
                state: {
                  adId: item.adId
                }
              }}
                > PROXIMO
                </Link>
              </Grid>
            )))
            : false
        }
        </Grid>
      </div>
    );
  }
}

ListReservationsOwner.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(ListReservationsOwner);
