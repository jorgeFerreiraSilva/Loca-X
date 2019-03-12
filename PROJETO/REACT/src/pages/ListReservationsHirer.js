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

class ListReservationsHirer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userReservations: []
    };
  }

  componentDidMount() {
    this.setState({ userId: this.props.loggedInUser._id});
    axios.get(`http://192.168.0.41:8080/api/reservation/hirer/${this.props.loggedInUser._id}`)
      .then((response) => {
        const userReservations = response.data;
        this.setState({ userReservations });
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
          { (this.state.userReservations !== null) ?      
            (this.state.userReservations.map((item, index) => (
              <Grid key={index} item>
                {item.title}
                Datas: {item.startDate} -> {item.endDate}
                Preço: {item.totalPrice}
								Status: {item.status}
								<Link to={{
                pathname: `/reservas/inq/${item._id}`,
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

ListReservationsHirer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(ListReservationsHirer);