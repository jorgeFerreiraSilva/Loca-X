import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import AuthService from "./auth-service";
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import './Card.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      state: "",
      username: "",
      password: "",
      redirect: null
    };
    this.updateState = this.updateState.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.service = new AuthService();
  }

  updateState(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { username, password, name, state } = this.state;
    const { getUser } = this.props;
    this.service.signup(username, password, name, state)
      .then((response) => {
        this.setState({
          username: '',
          password: '',
          state: '',
          name: ''
        });
        getUser(response);
        this.setState({ redirect: <Redirect to="/entrar" /> });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const r = this.state.redirect !== null ? this.state.redirect : false;
    return (
      <div className="App">
        {r}
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card>

                <div className='w-75 mx-auto margin-top-bottom-20'>
                  <h5 className='text-center'>Cadastrar-se</h5>
                  <form onSubmit={this.handleFormSubmit} >
                    <div className="form-group">
                      <label for="">Nome</label>
                      <input onChange={e => this.updateState(e)} value={this.state.name} type="text" placeholder="Name" name="name" />
                    </div>

                    <div className="form-group">
                      <label for="">Estado</label>
                      <input
                        className="input"
                        onChange={e => this.updateState(e)}
                        value={this.state.state}
                        type="text"
                        placeholder="Estado"
                        name="state"
                      />
                    </div>

                    <div className="form-group">
                      <label for="">E-mail</label>

                      <input
                        className="input"
                        onChange={e => this.updateState(e)}
                        value={this.state.username}
                        type="email"
                        placeholder="E-mail"
                        name="username"
                      />
                    </div>



                    <div className="form-group">
                      <label for="exampleInputPassword1">Senha</label>
                      <input
                        className="input"
                        onChange={e => this.updateState(e)}
                        value={this.state.password}
                        type="password"
                        placeholder="Password"
                        name="password"
                      />
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
      </div >
    );
  }
}

export default Signup;
