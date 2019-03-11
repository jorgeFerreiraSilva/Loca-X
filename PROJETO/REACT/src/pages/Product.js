import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid,
  Card
} from '@material-ui/core';
import Details from '../components/Product/Details';
import ProdInfoCard from '../components/Product/ProdInfoCard';

const styles = theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'space-around',
    paddingTop: '10%'
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    alignContent: 'space-between'
  }
});

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      pathPictures: '',
      pricePerDay: ''
    };
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  componentDidMount() {
    this.handleUpdateItem();
  }

  handleUpdateItem() {
    axios.get(`http://192.168.0.41:8080/api/ads/${this.props.match.params.id}`, this.state)
      .then((response) => {
        const { title, description, pathPictures, pricePerDay } = response.data;
        this.setState({ title, description, pathPictures, pricePerDay });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <Grid container spacing={24} className={classes.container}>
            <Grid item xs={4} className={classes.leftContainer}>
              <ProdInfoCard image={this.state.pathPictures[0]} name={this.state.title} description={this.state.description} />
            </Grid>
            <Grid item xs={4}>
              <Details price={this.state.pricePerDay} productID={this.props.match.params.id} />
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Product);
