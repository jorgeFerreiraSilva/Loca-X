import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';


const primary = red[900];

const styles = {
  card: {
    width: 190,
    boxShadow: 'none'
  },
  media: {
    height: 130,
    margin: 30
  },
  text: {
    color: primary,
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: 25,
    margin: 5
  }
};


class UserProfileCard extends React.Component {
  render() {
    const { classes, _userId, name, description, pathPicture, state } = this.props;
 
 
    return (
      <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pathPicture}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )      
  }
}




UserProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfileCard);
