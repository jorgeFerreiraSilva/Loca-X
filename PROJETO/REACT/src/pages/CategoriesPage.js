import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Grid from "@material-ui/core/Grid";
import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';


const styles = theme => ({
  root: {
    padding: "0 85px",
    marginTop: 20,
    justifyContent: "flex-start"
  }
});


class CategoriesPage extends React.Component {
  render() {
    const categories = [{
      name: 'Festa',
      image: 'https://res.cloudinary.com/dp1vqoeqr/image/upload/v1551756712/party.png'
    },
    {
      name: 'Ferramentas',
      image: 'https://res.cloudinary.com/dp1vqoeqr/image/upload/v1551785829/tools_2.png'
    },
    {
      name: 'Música',
      image: 'https://res.cloudinary.com/dp1vqoeqr/image/upload/v1551881560/electric-guitar.png'
    }
    ];
    const { classes } = this.props;
    return (

      <div className={classes.root}>
      <Header />
      <SearchBar />
        <Grid
          container
          justify="flex-start"
          spacing={16}
        >
          {categories.map((
            category,
            index
          ) => (
            <Grid key={index} item>
              {" "}
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}


CategoriesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriesPage);
