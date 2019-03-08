import React, { Component } from 'react';
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

const styles = theme => ({
  root: {
    flexGrow: 1
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
    height: 250
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
      single: null
    };
  }

  handleChangeCategories = name => value => {
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    axios.get(`http://192.168.0.41:8080/api/ads?state=${this.props.selectedState}`)
      .then((response) => {
        this.setState({ listResults: response.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
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

    console.log('---------------------------------------');
    console.log(list);
    console.log('---------------------------------------');

    if (this.state.single !== null) {
      list = listResults.filter((item) => item.category.includes(this.state.single.value))
    } else {
      list = listResults;
    }

    return (
      <div className={classes.myroot}>
        <div className={classes.selectroot}>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              options={suggestions}
              components={components}
              value={this.state.single}
              onChange={this.handleChangeCategories('single')}
              placeholder="Categorias"
              isClearable
            />
          </NoSsr>
        </div>
        <Grid
          container
          justify="flex-start"
          spacing={16}
        >
          {this.state.single === null ? console.log('aqui') : console.log('dfsahdhgbsd')}


          {list.map((result, index) => (
            <Grid key={index} item>
              {' '}
              <MyCard result={result} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SearchResults);
