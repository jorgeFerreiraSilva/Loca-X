import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import MyButton from '../components/MyButton';
import AuthService from './auth-service';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import './Card.css';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      redirect: null
    };
    this.service = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    console.log(this.state)
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleFormSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
      .then(response => {
        console.log('<-------------------- RESPONSE -------------------->');
        console.log(response);
        console.log('<-------------------- RESPONSE -------------------->');

        this.setState({ username: "", password: "" });
        this.props.getUser(response);
        this.setState({ redirect: <Redirect to='/' /> })
      })
      .catch(error => console.log(error))
  }

  render() {
    const r = this.state.redirect !== null ? this.state.redirect : false;
    return (
      < div className='App' >
      { r }
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card>
              <div className='w-75 mx-auto margin-top-bottom-20'>
              <h5 className='text-center'>Entrar</h5>
                <form onSubmit={this.handleFormSubmit} >
                  <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input onChange={this.handleChange('username')} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="insira o email" />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Senha</label>
                    <input onChange={this.handleChange('password')} type="password" className="form-control" id="exampleInputPassword1" placeholder="insira a senha" />
                  </div>
                  <div className='text-center'>
                    <Button type='submit'>Entrar</Button>
                  </div>
                </form>
              </div>
            </Card>

          </Col>
        </Row>
      </Container>

      <Link to="/adicionar">
        <Button>buscar</Button>
      </Link>
      <Link to="/reservas/dono">
        <Button> reservas dono</Button>
      </Link>
      <Link to="/reservas/inq">
        <Button>reservas inquilino</Button>
      </Link>

      </div >
    );
  }
}

export default Login;

