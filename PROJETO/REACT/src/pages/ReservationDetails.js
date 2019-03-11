import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid,
  Card,
  TextField,
  Button
} from '@material-ui/core';

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
      message: '',
      hirerId: null,
      ownerId: null,
      pricePerDay: null,
      startDate: null,
      endDate: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = e => {  
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    axios.get(`http://192.168.0.41:8080/api/ads/${this.props.match.params.id}`)
    .then((response) => {
      const { _id, name, description, pathPicture, state } = response.data;
      this.setState({ _id, name, description, pathPicture, state });
    })
    .catch(err => console.log(err));
    
  axios.get(`http://192.168.0.41:8080/api/ads/users/${this.props.match.params.id}`)
      .then((response) => {
        const ads = response.data;
        console.log('-------------------');
        console.log(response.data);
        console.log('-------------------');
        this.setState({ ads });

      });
  }


  handleFormSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:8080/api/ads/:adId/users/:ownerId/:hirerId", this.state).then(response => {
      console.log(response);
    });
  }

  render() {
    const { classes, startDate, endDate, totalPrice } = this.props;
    return (
      <div>
        <Grid container spacing={24} className={classes.container}>
          <Grid item xs={4} className={classes.leftContainer}>
            <ProdInfoCard image={this.state.pathPictures[0]} name={this.state.title} description={this.state.description} />  
          </Grid>
          <Grid item xs={4}>
          <Paper square className={classes.box}>
            <div className={classes.boxContent}>
            <h1>{this.state.pricePerDay}</h1>
            <hr></hr>
            <h3>{this.props.description}</h3>
            </div>
          </Paper>
          <TextField
              id="outlined-full-width"
              name="message"
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
            <Button onClick={(event) => { handleFormSubmit(event); }}>

            </Button>
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
