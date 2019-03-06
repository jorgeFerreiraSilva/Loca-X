import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import InputBase from "@material-ui/core/InputBase";
import { TextField } from 'material-ui';

const styles = theme => ({
  search: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px",
    position: "relative",
    borderRadius: "4px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(235, 235, 235)",
    borderRadius: "4px",
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 20,
      width: "auto"
    }
  },
  searchIcon: {
    width: "50px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: '12px',
    paddingRight: '8px',
    paddingBottom: '12px',
    paddingLeft: '50px',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 350
    },
    '&::placeholder': {
      color: 'black',
      fontWeight: 600
    }
  },
  magnifyingGlass: {
    fontWeight: 800,
    color: 'black'
  }
});

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    console.log(this.state)
  };

  handleFormSubmit(event) {
    event.preventDefault();
    console.log("Submited");
  }

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.search}>
      <form onSubmit={this.handleFormSubmit}>
        <TextField
          placeholder="Busque itens"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          name="searchInput"
          onChange={this.handleChange('searchInput')}
        />
        <Button type="submit" value="submit" className={classes.button}><SearchIcon className={classes.magnifyingGlass} /></Button>
      </form>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Search);


