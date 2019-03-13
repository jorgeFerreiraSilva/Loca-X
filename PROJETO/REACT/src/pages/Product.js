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
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';
import CardAvatar from '../components/Card/CardAvatar';
import CardBody from '../components/Card/CardBody';
import CardFooter from '../components/Card/CardFooter';
import GridItem from '../components/Grid/GridItem';
import GridContainer from '../components/Grid/GridContainer';
import Button from '../components/CustomButtons/Button.jsx';

const styles = theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    paddingTop: '10%',
    margin: '0 20% 0 30%'
  },
  item: {
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    alignContent: 'space-between'
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  image: {
    maxWidth: '80%',
    padding: '10% 20%'
  },
  avatar: {
    heigth: '10px'
  }
});

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: '',
      ownerName: '',
      ownerPicture: '',
      title: '',
      description: '',
      pathPictures: '',
      pricePerDay: null,
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
        const { ownerId, title, description, pathPictures, pricePerDay } = response.data;
        this.setState({ ownerId, title, description, pathPictures, pricePerDay });
        axios.get(`http://192.168.0.41:8080/api/users/${ownerId}`)
          .then((user) => {
            const ownerName = user.data.name;
            const ownerPicture = user.data.pathPicture;
            this.setState({ ownerName, ownerPicture });
          });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <GridContainer className={classes.container}>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <img className={classes.image} src={this.state.pathPictures[0]} alt="product"/>
                <CardBody profile>
                  <h1 className={classes.cardTitle}>{this.state.title}</h1>
                  <p className={classes.description}>
                    {this.state.description}
                  </p>
                  <div>
                    
                  <CardAvatar profile className={classes.avatar}>
                  <Link to={{
                    pathname: `/users/${this.state.ownerId}`
                  }}
                  > 
                    <img src={this.state.ownerPicture}alt="..." />
                    </Link>
                  </CardAvatar>
                  </div>
                  <p>
                    Anunciado por: 
                    {' '}
                    {this.state.ownerName}
                  </p>
                      
                      </CardBody>
                    </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card profile>
                  <CardBody profile>
                    <Details priceperDay={this.state.pricePerDay} productID={this.props.match.params.id} />
                  </CardBody>
                </Card>
              </GridItem>
          </GridContainer>
        </div>
      </MuiThemeProvider>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Product);
