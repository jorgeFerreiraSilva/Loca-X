import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import service from '../api/service'
import CameraAlt from '@material-ui/icons/CameraAlt';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';


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
  }
  // fileInput: {
  //   display: 'inline-block',
  //   textAlign: 'left',
  //   background: '#fff',
  //   padding: '16px',
  //   width: '450px',
  //   position: 'relative',
  //   borderRadius: '3px',
  // }
});

const categories = [
  {
    label: 'Eletrônicos',
    value: 'Eletrônicos',
  },
  {
    value: 'Ferramentas',
    label: 'Ferramentas',
  },
  {
    value: 'Esportes e Aventura',
    label: 'Esportes e Aventura',
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
    value: 'Móveis',
    label: 'Móveis',
  },
  {
    value: 'Cozinha',
    label: 'Cozinha',
  },
  {
    value: 'Outros',
    label: 'Outros',
  }
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

  constructor() {
    super();
    this.state = {
      title: '',
      pricePerDay: '',
      description: '',
      category: '',
      state: '',
      image1: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleFileUpload = e => {
    this.setState({ image1: e.target.files[0] });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { image1, title, description, pricePerDay, state, category } = this.state;
    const { _id: userId } = this.props.loggedInUser;

    const uploadData = new FormData();
    uploadData.append("image1", image1);
    uploadData.append('title', title)
    uploadData.append('description', description)
    uploadData.append('pricePerDay', pricePerDay)
    uploadData.append('state', state)
    uploadData.append('category', category)
    const redirect = null;
    service.saveNewThing(uploadData, userId)
      .then(res => {
        this.props.history.push('/')
      })
      .catch(err => {
        console.log("Error while adding the thing: ", err);
      });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    console.log('mystate', this.state);
    axios.post("http://192.168.0.41:8080/api/ad", this.state).then(response => {
      console.log(response);
    });
  }

  render() {
    const { classes } = this.props;

    return (

      <div className={classes.root}>
        <Grid xs={2}>
          <form onSubmit={e => this.handleSubmit(e)}>
            <TextField
              label="Título"
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              name="title"
              value={this.state.title}
              onChange={e => this.handleChange(e)}
            />


            <TextField
              label="Descrição"
              multiline
              rowsMax="10"
              name="description"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              select
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              label="Categoria"
              value={this.state.category}
              name="category"
              onChange={e => this.handleChange(e)}

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
              name="state"
              onChange={e => this.handleChange(e)}
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
              value={this.state.pricePerDay}
              name="pricePerDay"
              onChange={e => this.handleChange(e)}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
            />

            {/* <div className={classes.fileInput}>
          <input label="image1"
            name="image1"
            type="file"
            onChange={(e) => this.handleFileUpload(e)}>
            <span class='button'>Choose</span>
            <span class='label' data-js-label>No file selected</label>
          </input>
          </div> */}

            <input
              label="image1"
              name="image1"
              type="file"
              onChange={(e) => this.handleFileUpload(e)} />
            <button type="submit">Save</button>
          </form>
        </Grid>
      </div>
    );
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProduct);