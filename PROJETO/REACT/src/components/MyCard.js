import React, { Component } from 'react'; 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
 
import Launch from "@material-ui/icons/Launch"; 
 
const styles = theme => ({
  card: {
    width: 340,
    boxShadow: "none"
  },
  media: {
    height:220,
    objectFit: 'cover',
    borderRadius: 5
  },
  cardContentArea:{
    padding:"4px 0px"
  },
  year:{
    backgroundColor:"#A61D55",
    borderRadius:"3.2px", // This is the border radius Airbnb uses for their little PLUS chips
    color:"white",
    padding:"0 4px" // Same padding that AirBnb uses
  },
  yearArea:{
    textTransform:"uppercase",
    color:"#A61D55", // matching the Airbnb purple
    fontWeight: 600,
    fontSize:12,
    lineHeight:"16px",
    paddingTop:4,
    
  },
  launchicon: {
    fontSize:12, // I put a little icon next to the original article link
  },
  articleLink:{
    textDecoration:"none",
    color:"#A61D55", 
  }
});

class MyCard extends Component {
    render() {
      const { classes } = this.props; // destructuring props 
   
   
      return (
        <Card className={classes.card}>
        <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image="https://cdn.cliqueinc.com/cache/posts/269360/lady-gaga-malibu-home-269360-1538670263859-main.700x0c.jpg"
        />
          <CardContent className={classes.cardContentArea}>
   
            <Typography noWrap className={classes.yearArea} component="p">
             Featured in: <span className={classes.year}>1989</span>  · <a href="#" className={classes.articleLink} target="_blank">Original Article </a>
            </Typography>
   
            <Typography variant="h6" component="h2">
              madureira
            </Typography>
            <div className={classes.snippet_area}>
            <Typography className={classes.snippet_text} noWrap component="p">
             aaa 
            </Typography>
            <Typography component="p">
            <a href="#" style={{textDecoration:"none", color:"#008489", fontWeight:600, fontSize:12}} className={classes.articleLink} target="_blank">Learn More</a>
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