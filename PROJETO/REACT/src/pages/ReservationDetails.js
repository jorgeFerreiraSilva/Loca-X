import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid,
  Card,
  TextField,
  Button
} from '@material-ui/core';
import ProdInfoCard from '../components/Product/ProdInfoCard';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class ReservationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      adId: null,
      hirerId: null,
      ownerId: null,
      pricePerDay: null,
      totalPrice: null,
      startDate: null,
      endDate: null,
      title: null,
      description: null,
      pathPictures: null,
      state: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = e => {  
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {

    const startDate = 'aaaa';
    const endDate = 'bbbb';
    const totalPrice = 9;
    this.setState({ adId: this.props.match.params.id });
    // const { startDate, endDate, totalPrice } = this.props.location.state;
    
    this.setState({ startDate, endDate, totalPrice });
    axios.get(`http://192.168.0.41:8080/api/ads/${this.props.match.params.id}`)
    .then((response) => {
      const { ownerId, pricePerDay, title, description, pathPictures, state } = response.data;
      console.log(response.data);
      console.log('aaaa', this.state.adId)
      this.setState({ ownerId, pricePerDay, title, description, pathPictures, state });
      
    })
    .catch(err => console.log(err));
  }
  
  
  handleFormSubmit(event) {
    event.preventDefault();
    axios.post(`http://192.168.0.41:8080/api/reservation/ads/${adId}/users/${ownerId}/${this.props.loggedInUser._id}`, this.state)
    .then(response => {
      console.log(response);
      const reservationId = response.data._id;
      // axios.post(`http://192.168.0.41:8080/api/message/reservation/${reservationId}/users/${ownerId}/${this.props.loggedInUser._id}`, this.state)
      // .then((response) => {
      //   console.log(response);
      // });
    });
  }
  
  render() {
    const { pathPictures } = this.state;
    console.log('test', pathPictures)
    console.log('bbbb',this.state);
    const { classes } = this.props;
    if(pathPictures !== null) {
      console.log('aqui!');
      console.log('picture', pathPictures);  
    }
    console.log(this.props.loggedInUser._id);
    

    return (
      <div>
        <Grid container spacing={24} className={classes.container}>
          <Grid item xs={4} className={classes.leftContainer}>
            <ProdInfoCard image={pathPictures} name={this.state.title} description={this.state.description} />  
          </Grid>
          <Grid item xs={4}>
          <Paper square className={classes.box}>
            <div className={classes.boxContent}>
            <h1>{this.state.pricePerDay}</h1>
            <hr></hr>
            <h3>{this.props.description}</h3>
            </div>
          </Paper>
          <form onSubmit={e => this.handleSubmit(e)}>
          <TextField
              id="outlined-full-width"
              name="text"
              label="Label"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              multiline
              rows="5"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
              shrink: true
            }}
            onChange={ e => this.handleChange(e)}
            />
            {/* <Button onClick={(event) => { handleFormSubmit(event) }}>
              SEND
            </Button> */}
            <button type="submit">Save</button>
            </form>
          </Grid>
        </Grid>

        </div>
    );
  }
}

ReservationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReservationDetails);
