/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid
} from '@material-ui/core';
import Details from '../components/Product/Details';
import ProdInfoCard from '../components/Product/ProdInfoCard';
import Card from "../components/Card/Card";
import CardHeader from "../components/Card/CardHeader";
import CardAvatar from "../components/Card/CardAvatar";
import CardBody from "../components/Card/CardBody";
import CardFooter from "../components/Card/CardFooter";
import GridItem from '../components/Grid/GridItem';
import GridContainer from '../components/Grid/GridContainer';
import Button from "../components/CustomButtons/Button.jsx";

const styles = theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'space-around',
    paddingTop: '10%'
  },
  item: {
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    alignContent: 'space-between'
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
});

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      pathPictures: '',
      pricePerDay: '',
      startDate: null,
      endDate: null,
      totalPrice: null
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
      // <MuiThemeProvider>
      //   <div>
      //     <Grid container spacing={24} className={classes.container}>
      //       <Grid item xs={6} className={classes.item}>
      //         <ProdInfoCard image={this.state.pathPictures[0]} name={this.state.title} description={this.state.description} />
      //       </Grid>
      //       <Grid item xs={6} className={classes.item}>
      //         <Details priceperDay={this.state.pricePerDay} productID={this.props.match.params.id} />
      //       </Grid>
      //     </Grid>
      //   </div>
      // </MuiThemeProvider>

      <div>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={this.state.pathPictures[0]} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{this.state.title}</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don't be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </div>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Product);
