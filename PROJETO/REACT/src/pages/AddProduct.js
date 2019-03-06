import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CameraAlt from '@material-ui/icons/CameraAlt'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

const categories = [
  {
    value: 'Ferramentas',
    label: 'Ferramentas',
  },
  {
    value: 'Festa',
    label: 'Festa',
  },
  {
    value: 'Música',
    label: 'Música',
  },
  {
    value: 'Eletrodomésticos e Cozinha',
    label: 'Eletrodomésticos e Cozinha',
  },
];

class OutlinedInputAdornments extends React.Component {
  state = {
    title: '',
    price: '',
    password: '',
    description: '',
    category: '',
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    console.log(this.state)
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          onChange={this.handleChange('title')}
          InputProps={{
            startAdornment: <InputAdornment position="start">Título</InputAdornment>,
          }}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Descrição"
          multiline
          rowsMax="10"
          value={this.state.description}
          onChange={this.handleChange('description')}
          className={classes.textField}
          margin="normal"
          helperText="hello"
          variant="outlined"
        />

        <TextField
          select
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Categoria"
          value={this.state.category}
          onChange={this.handleChange('category')}
          
        >
          {categories.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-adornment-amount"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Diária"
          value={this.state.amount}
          onChange={this.handleChange('price')}
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
        />

        <input
          id="outlined-adornment-weight"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="picture"
          type="file"
          value={this.state.weight}
          onChange={this.handleChange('weight')}
          InputProps={{
            endAdornment: <InputAdornment position="end"><CameraAlt /></InputAdornment>,
          }}
        />
      </div>
    );
  }
}

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedInputAdornments);