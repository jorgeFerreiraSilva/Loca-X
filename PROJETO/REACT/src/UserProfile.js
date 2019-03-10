import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid
} from '@material-ui/core';
import MyCard from './components/MyCard';

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

	handleUpdateItem() {
		//BUSCAR NA API POR ID DO USUARIO, MOSTRAR SUAS PROPRIEDADES E PEGAR ARRAY CO ID DOS ANUNCIOS
		//COM OS ANUNCIOS BUSCAR CADA UM E COLOCAR NUMA ARRAY userAds (que vai fazer o map pra cada card)
  }

  componentDidMount() {
    this.handleUpdateItem();
	}
	
	render() {
    const { classes, theme } = this.props;
    return (
      <MuiThemeProvider>
      <div>
        <div className={classes.background} />
        <Grid container spacing={24} className={classes.container}>
          <Grid item xs={4} className={classes.leftContainer}>
            {/* AQUI VAI FICAR O CARD COM INFOS DO USER */}
          </Grid>
          <Grid item xs={8}>
					{userAds.map((result, index) => (
            <Grid key={index} item>
              <Link to={`/product/${result._id}`}>
                <MyCard result={result} />
              </Link>
            </Grid>
          ))}
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