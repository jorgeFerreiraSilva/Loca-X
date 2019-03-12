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
import MyButton from '../components/MyButton';

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


class SingleResHirer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      pathPictures: null,
      pricePerDay: null,
      totalPrice: null,
      startDate: null,
      endDate: null,
      hirerId: null,
      status: null
    };
  }

  componentDidMount() {
    console.log(this.props.location.state);
    axios.get(`http://192.168.0.41:8080/api/ads/${this.props.location.state.adId}`)
      .then((response) => {
        const { title, description, pathPictures, pricePerDay } = response.data;
        this.setState({ title, description, pathPictures, pricePerDay });
        console.log('AD RESPONSE', response);
      })
      .catch(err => console.log(err));
    axios.get(`http://192.168.0.41:8080/api/reservation/${this.props.match.params.id}`)
      .then((response) => {
        const { totalPrice, startDate, endDate, hirerId } = response.data[0];
        this.setState({ totalPrice, startDate, endDate, hirerId });
        console.log('RESERVATION RESPONSE', response)
      });
  }

  // onItemClick: function(event) {

  //   event.currentTarget.style.backgroundColor = '#ccc';
  //   axios.patch(`http://192.168.0.41:8080/api/reservation/${this.props.match.params.id}`, { status: 'Recusado' })
  //   .then((response) => {
  //     console.log('reject');
  //     const { status } = response.data;
  //     this.setState({ status });
  //     console.log(status);
  //   })
  //   .catch(err => console.log(err));
  // };

  render (){
    return (
      <div>
        <h1>Infos do anuncio</h1>
        <p>
          {this.state.title}
          {this.state.description}
        </p>
        <h1>infos da reserva</h1>
        <p>
      Start date {this.state.startDate}
      End date {this.state.endDate}
        </p>
      </div>

    );
  }
}

SingleResHirer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(SingleResHirer);