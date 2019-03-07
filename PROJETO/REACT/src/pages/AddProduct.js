import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CameraAlt from '@material-ui/icons/CameraAlt';

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

const states = [
  {
    value: "AC",
    label: "AC"
  },
  {
    value: "AL",
    label: "AL"
  },
  {
    value: "AP",
    label: "AP"
  },
  {
    value: "AM",
    label: "AM"
  },
  {
    value: "BA",
    label: "BA"
  },
  {
    value: "CE",
    label: "CE"
  },
  {
    value: "DF",
    label: "DF"
  },
  {
    value: "ES",
    label: "ES"
  },
  {
    value: "GO",
    label: "GO"
  },
  {
    value: "MA",
    label: "MA"
  },
  {
    value: "MT",
    label: "MT"
  },
  {
    value: "MS",
    label: "MS"
  },
  {
    value: "MG",
    label: "MG"
  },
  {
    value: "PA",
    label: "PA"
  },
  {
    value: "PB",
    label: "PB"
  },
  {
    value: "PR",
    label: "PR"
  },
  {
    value: "PE",
    label: "PE"
  },
  {
    value: "PI",
    label: "PI"
  },
  {
    value: "RR",
    label: "RR"
  },
  {
    value: "RO",
    label: "RO"
  },
  {
    value: "RJ",
    label: "RJ"
  },
  {
    value: "RN",
    label: "RN"
  },
  {
    value: "RS",
    label: "RS"
  },
  {
    value: "SC",
    label: "SC"
  },
  {
    value: "SP",
    label: "SP"
  },
  {
    value: "SE",
    label: "SE"
  },
  {
    value: "TO",
    label: "TO"
  }
]


class AddProduct extends React.Component {
  state = {
    title: '',
    pricePerDay: '',
    description: '',
    category: '',
    state: '',
    pathPictures: ''
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    console.log(this.state)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          label="Título"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          onChange={this.handleChange('title')}
        />


        <TextField
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
          select
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Estado"
          value={this.state.state}
          onChange={this.handleChange('state')}
        >
          {states.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Diária"
          value={this.state.amount}
          onChange={this.handleChange('pricePerDay')}
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
        />

        <input
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="picture"
          type="file"
          value={this.state.pathPictures}
          onChange={this.handleChange('pathPictures')}
          // InputProps={{
          //   endAdornment: <InputAdornment position="end"><CameraAlt /></InputAdornment>,
          // }}
        />
      </div>
    );
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProduct);