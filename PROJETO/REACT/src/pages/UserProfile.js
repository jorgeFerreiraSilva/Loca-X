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
import MyCard from '../components/MyCard';
import UserProfileCard from '../components/UserProfileCard';

const styles = theme => ({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'center'
  },
  image: {
    width: '100%'
  },
  box: {
    marginTop: '10%',
    boxShadow: 'none',
    border: '1px solid #e2e2e2'
  },
  boxContent: {
    padding: '10%'
  }
});

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      name: null,
      description: null,
      pathPicture: null,
      state: null,
      ads: null,
      adsStatus: false
    };
  }

  componentDidMount() {
    axios.get(`http://192.168.0.41:8080/api/users/${this.props.match.params.id}`)
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


  render() {
    console.log('stateeeee', this.state);
    const { classes, theme } = this.props;
    const { ads } = this.state;

    console.log('aqui', ads);
    const { _id, name, description, pathPicture, state } = this.state;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <MuiThemeProvider>
        <div>
          <Grid container spacing={24} className={classes.container}>
            <Grid item xs={4} className={classes.leftContainer}>
              <UserProfileCard userId={_id} name={name} description={description} pathPicture={pathPicture} state={state} />
            </Grid>
            <Grid
              container
              justify="flex-start"
              spacing={16}
            >
              { (ads !== null) ?      
                (ads.map((result, index) => (
                  <Grid key={index} item>
                    <Link to={`/product/${result._id}`}>
                      <MyCard result={result} />
                    </Link>
                  </Grid>
                )))
                : false
            }
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserProfile);


{/* <Grid item xs={8}>
            {ads.map((result, index) => (
              <Grid key={index} item>
                <Link to={`/product/${result._id}`}>
                  <MyCard result={result} />
                </Link>
              </Grid>
                ))}
            </Grid> */}