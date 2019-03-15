/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './css/Product.css';

class SingleResOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      pathPictures: '',
      pricePerDay: null,
      totalPrice: null,
      startDate: null,
      endDate: null,
      hirerId: null,
      hirerName: '',
      hirerPic: '',
      status: null,
      itemId: null
    };
    this.handleCancelRes = this.handleCancelRes.bind(this);
    this.handleAcceptRes = this.handleAcceptRes.bind(this);
    // this.onItemClick = this.onItemClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location.state);
    axios.get(`http://192.168.0.41:8080/api/ads/${this.props.location.state.adId}`)
      .then((response) => {
        const { title, description, pathPictures, pricePerDay } = response.data;
        this.setState({ title, description, pathPictures, pricePerDay });
        const itemId = response.data._id;
        this.setState({ itemId });
        console.log('AD RESPONSE', response);
      })
      .catch(err => console.log(err));
    axios.get(`http://192.168.0.41:8080/api/reservation/${this.props.match.params.id}`)
      .then((response) => {
        const { totalPrice, startDate, endDate, hirerId, status } = response.data[0];
        this.setState({ totalPrice, startDate, endDate, hirerId, status });
        console.log('RESERVATION RESPONSE', response);
        axios.get(`http://192.168.0.41:8080/api/users/${this.state.hirerId}`)
          .then((response) => {
            const hirerName = response.data.name;
            const hirerPic = response.data.pathPicture;
            this.setState({ hirerName, hirerPic });
            console.log('OWNER DATA>>>>>', response.data);
          });
      });
  }

  handleCancelRes() {
    console.log('reject');
    axios.patch(`http://192.168.0.41:8080/api/reservation/${this.props.match.params.id}`, { status: 'Recusado' })
      .then((response) => {
        const { status } = response.data;
        // this.setState({ status });
        console.log('Recusado');
      })
      .catch(err => console.log(err));
  }

  handleAcceptRes() {
    console.log('accept');
    axios.patch(`http://192.168.0.41:8080/api/reservation/${this.props.match.params.id}`, { status: 'Alugando' })
      .then((response) => {
        const { status } = response.data;
        // this.setState({ status });
        console.log('Alugado');
      })
      .catch(err => console.log(err));
  }

  // onItemClick: function(event) {

  //   event.currentTarget.style.backgroundColor = '#ccc';
  //   axios.patch(`http://192.168.0.41:8080/api/reservation/${this.props.match.params.id}`, { status: 'Recusado' })
  //   .then((response) => {
  //     console.log('reject');
  //     const { status } = response.data;
  //     this.setState({ status });
  //     console.log(status);
  //   })
  //   .catch(err => console.log(err));
  // };

  render() {
    return (
      <div className="app">
        <Container>
        <Row className="justify-content">

          <Col xs={12} md={6} className="margin-bottom-5">
            <Card className="margin-bottom-5 align-item padding-5 border-shadow">
              <Card.Img className="w-50" variant="top" src={this.state.pathPictures[0]} alt="product" />
            </Card>
            <Card>
              <Card.Header><b>{this.state.title}</b></Card.Header>
              <Card.Body>
                <Card.Text>
                  {this.state.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card>
              <Card.Header><b>Informações da reserva</b></Card.Header>
              <Card.Body>
                <div className="margin-bottom-5 padding-bottom-5 border-bottom">
                  <Card.Text>
                    <span style={{ 'font-size': '16px' }}> Status: </span> 
                    {' '}
                    <strong>{this.state.status}</strong>
                    <hr/>
                    <span style={{ 'font-size': '16px' }}> Início: </span> 
                    {' '}
                    <strong>{this.state.startDate}</strong>
                    <br/>
                    <span style={{ 'font-size': '16px' }}> Término: </span> 
                    {' '}
                    <strong>{this.state.endDate}</strong>
                    <hr/>
                    <span style={{ 'font-size': '16px' }}> Total: </span> 
                    {' '}
                    <strong>R$ {this.state.totalPrice}</strong>
                    {' '}
                    
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>

            <Card className="text-center margin-top-bottom-5 padding-5">
              <div>
                <Link to={{
                  pathname: `/perfil/${this.state.hirerId}`
                }}
                >
                  <Image style={{ width: '130px' }} src={this.state.hirerPic} roundedCircle />
                </Link>
              </div>
              <div>
                <Card.Text>
                  Reservado por:
                  {' '} 
                  {' '}
                  {this.state.hirerName}
                </Card.Text>
              </div>
            </Card>
          </Col>

        </Row>
      </Container>
      </div>
    );
  }
}

export default SingleResOwner;
