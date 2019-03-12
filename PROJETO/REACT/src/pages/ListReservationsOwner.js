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
import MyCard from '../components/MyCard';

class ListReservationsOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userAds: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {

    this.setState({ userId: this.props.loggedInUser._id});

    axios.get(`http://192.168.0.41:8080/api/ads/${this.props.match.params.id}`)
      .then((response) => {
        let userAds = response.data.filter(item => item.ownerId === this.state.userId);
        this.setState({ userAds });
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
          { (this.state.userAds !== null) ?      
            (this.state.userAds.map((result, index) => (
              <Grid key={index} item>
                <Link to={`/product/${result._id}`}>
                  <MyCard result={result} />
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