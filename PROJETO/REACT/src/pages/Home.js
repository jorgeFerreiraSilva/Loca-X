import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import MyButton from '../components/MyButton';
import { Link } from 'react-router-dom';


const suggestions = [
  { label: 'AC' },
  { label: 'AL' },
  { label: 'AP' },
  { label: 'AM' },
  { label: 'BA' },
  { label: 'CE' },
  { label: 'DF' },
  { label: 'ES' },
  { label: 'GO' },
  { label: 'MA' },
  { label: 'MT' },
  { label: 'MS' },
  { label: 'MG' },
  { label: 'PA' },
  { label: 'PB' },
  { label: 'PR' },
  { label: 'PE' },
  { label: 'PI' },
  { label: 'RR' },
  { label: 'RO' },
  { label: 'RJ' },
  { label: 'RN' },
  { label: 'RS' },
  { label: 'SC' },
  { label: 'SP' },
  { label: 'SE' },
  { label: 'TO' }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  selectpaper: {
    margin: '20%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  selectroot: {
    flexGrow: 1,
    height: 250
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});
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
          ...props.innerProps,
        },
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
        fontWeight: props.isSelected ? 500 : 400,
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
        [props.selectProps.classes.chipFocused]: props.isFocused,
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
  ValueContainer,
};
class Home extends Component {
  state = {
    single: null
  };
  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
    this.props.updateState(value.label);
  };

  render() {
    const { classes, theme } = this.props;
    console.log(this.state)
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };
    return (
      <div>
        <Header />
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs></Grid>
            <Grid item xs={6}>
              <Paper className={classes.selectpaper}>
                <div className={classes.selectroot}>
                  <NoSsr>
                    <Select
                      classes={classes}
                      styles={selectStyles}
                      options={suggestions}
                      components={components}
                      value={this.state.single}
                      onChange={this.handleChange('single')}
                      placeholder="Selecione seu estado"
                      isClearable
                    />
                    <Link to="/itens">
                      <MyButton text="buscar" />
                    </Link>
                  </NoSsr>
                </div>

              </Paper>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(Home);