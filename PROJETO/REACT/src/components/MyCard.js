import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Launch from '@material-ui/icons/Launch';

const styles = theme => ({
  card: {
    // width: 340,
    // boxShadow: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px',
    borderRadius: '4px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgb(235, 235, 235)'
  },
  media: {
    height: 220,
    objectFit: 'contain',
    borderRadius: 5,
    width: '80%',
    margin: '0 auto'
  },
  cardContentArea: {
    padding: '4px 0px',
    width: '80%',
    margin: '0 auto 20px auto',
    textAlign: 'center'
  },
  year: {
    backgroundColor: '#9c27b0',
    borderRadius: '3.2px',
    color: 'white',
    padding: '0 4px'
  },
  yearArea: {
    textTransform: 'uppercase',
    color: '#DD4132',
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '16px',
    paddingTop: 4

  },
  launchicon: {
    fontSize: 12
  },
  articleLink: {
    textDecoration: 'none',
    color: '#A61D55'
  }
});

class MyCard extends Component {
  render() {
    const { classes, result } = this.props;
    return (
      <Card className={classes.card} xs={3}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={result.pathPictures[0]}
          />
          <CardContent className={classes.cardContentArea}>


            <div className={classes.snippet_area}>
              <Typography variant="h6" component="h2">
                {result.title}
              </Typography>
              <Typography className={classes.snippet_text} noWrap component="p">
                {result.description}
              </Typography>
              <Typography noWrap className={classes.yearArea} component="p">
                <span className={classes.year}>R${result.pricePerDay}</span>
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>

      </Card>
    )
  }
}


MyCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MyCard);
