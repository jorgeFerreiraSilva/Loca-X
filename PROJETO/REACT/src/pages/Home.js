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
// import Button from '../components/CustomButtons/Button.jsx';
import { Link } from 'react-router-dom';
import HomeNav from '../components/Navbars/Home';
import axios from 'axios';
import queryString from 'query-string'
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';



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

class Home extends Component {
  constructor() {
    super();
    this.state = {
      single: 'SP'
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchAds = this.searchAds.bind(this);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  searchAds = () => {
    this.props.updateAds(this.state.single);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <HomeNav />
        <div className="App">
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Card>
                  <div className='w-75 mx-auto margin-top-bottom-20'>
                    <h5 className='text-center'>Selecione um Estado</h5>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Control as="select" value={this.state.single}
                        name="single"
                        onChange={e => this.handleChange(e)} >
                        {suggestions.map(option => (
                          <option>{option.value}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <div className="text-center">
                      <Link to={`/itens?estado=${this.state.single}`}>
                        <Button type='submit'>Pesquisar</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div >
      </div >
    );
  }
}

export default Home;