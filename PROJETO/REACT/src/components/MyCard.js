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
    backgroundColor:"#DD4132",
    borderRadius:"3.2px", 
    color:"white",
    padding:"0 4px" 
  },
  yearArea:{
    textTransform:"uppercase",
    color:"#DD4132", 
    fontWeight: 600,
    fontSize:12,
    lineHeight:"16px",
    paddingTop:4,
    
  },
  launchicon: {
    fontSize:12, 
  },
  articleLink:{
    textDecoration:"none",
    color:"#A61D55", 
  }
});

class MyCard extends Component {
    render() {
      const { classes, result } = this.props;
   
   
      return (
        <Card className={classes.card}>
        <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image={result.image}
        />
          <CardContent className={classes.cardContentArea}>
   
            <Typography noWrap className={classes.yearArea} component="p">
             Diária: <span className={classes.year}>R${result.price}</span>
            </Typography>
   
            <Typography variant="h6" component="h2">
              {result.name}
            </Typography>
            <div className={classes.snippet_area}>
            <Typography className={classes.snippet_text} noWrap component="p">
             {result.description}
            </Typography>
            <Typography component="p">
            <a href="#" style={{textDecoration:"none", color:"#008489", fontWeight:600, fontSize:12}} className={classes.articleLink} target="_blank">Ver mais</a>
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