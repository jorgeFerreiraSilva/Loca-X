import React, { Component } from 'react';
import queryString from 'query-string'
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import classNames from 'classnames';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import MyCard from '../components/MyCard';
import Header from '../components/Header';
import MyButton from '../components/MyButton';
import { Link } from 'react-router-dom';
import { HardwarePhoneAndroid } from 'material-ui/svg-icons';
import NavLogged from '../../src/components/Navbars/Loggedin.js'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  search: {
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px',
    position: 'relative',
    borderRadius: '4px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgb(235, 235, 235)',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 20,
      width: 'auto'
    }
  },
  searchIcon: {
    width: '50px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  magnifyingGlass: {
    fontWeight: 800,
    color: 'black'
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
  mediaquery: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  myroot: {
    padding: '0 85px',
    marginTop: 20,
    justifyContent: 'flex-start'
  },
  selectpaper: {
    margin: '20%',
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  selectroot: {
    flexGrow: 1,
    marginTop: '10px',
    marginBottom: '35px'
  },
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const suggestions = [
  { label: 'Eletrônicos' },
  { label: 'Ferramentas' },
  { label: 'Esportes e Aventura' },
  { label: 'Festa' },
  { label: 'Música' },
  { label: 'Móveis' },
  { label: 'Cozinha' },
  { label: 'Outros' }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};


class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      listResults: [],
      single: null,
      search: ''
    };
    this.updateState = this.updateState.bind(this)
  }

  updateState(obj) {
    this.setState({
      search: obj.toLowerCase()
    });
  }

  handleChangeSearch = prop => event => {
    this.setState({ search: event.target.value });
  };


  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    console.log(values.estado);
    console.log(this.props.allAdsFiltered)

    this.props.updateAds(values.estado)
  }

  render() {
    console.log(this.props.location.estado);
    console.log(this.props.allAdsFiltered);
    console.log(this.state);


    const { classes, theme } = this.props;
    const { listResults } = this.state;
    let list = [];
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    if (this.state.single !== null && this.state.search !== null) {
      list = this.props.allAdsFiltered.filter((item) => item.category.includes(this.state.single.value) && item.title.toLowerCase().includes(this.state.search))
    } else if (this.state.single !== null) {
      list = this.props.allAdsFiltered.filter((item) => item.category.includes(this.state.single.value))
    } else if (this.state.search !== '') {
      list = this.props.allAdsFiltered.filter((item) => item.title.toLowerCase().includes(this.state.search))
    } else {
      list = this.props.allAdsFiltered;
    }

    return (
      <div className={classes.myroot}>
        <div className='' style={{'margin-left': '0px !important', 'display': 'flex', "flex-wrap": 'wrap' }}>
          <span>

            <div className={classes.search} style={{width: '280px'}}>
              <div className={classes.searchIcon}>
                <SearchIcon className={classes.magnifyingGlass} />
              </div>
              <InputBase
                placeholder="Buscar itens"
                onChange={this.handleChangeSearch('search')}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </span>
          <span>

            <div className={classes.selectroot} style={{ "margin-left": "20px", width:'200px', "pading-bottom": '-2px' }}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  options={suggestions}
                  components={components}
                  value={this.state.single}
                  onChange={this.handleChange('single')}
                  placeholder="Categorias"
                  isClearable
                />
              </NoSsr>
            </div>
          </span>
        </div>

        <Grid
          className={classes.mediaquery}
          container
          justify="flex-start"
          spacing={16}
          wrap='wrap'
        >
          {(this.props.allAdsFiltered !== null) ?
            (list.map((result, index) => (
              <Grid lg={3} md={4} sm={6} key={index} item style={{ 'min-width': '270px' }}>
                <Link to={`/produto/${result._id}`} style={{ textDecoration: 'none' }}>
                  <MyCard result={result} />
                </Link>
              </Grid>
            )))
            : false
          }
        </Grid>
      </div>
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SearchResults);
