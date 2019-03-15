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
import Form from 'react-bootstrap/Form';
import './css/Product.css';

class SingleResOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationId: '',
      text: '',
      title: '',
      description: '',
      pathPictures: '',
      pricePerDay: '',
      totalPrice: '',
      startDate: '',
      endDate: '',
      hirerId: '',
      hirerName: '',
      ownerId: '',
      ownerName: '',
      ownerPic: '',
      status: '',
      itemId: '',
      messages: null
    };
    this.handleCancelRes = this.handleCancelRes.bind(this);
    this.handleAcceptRes = this.handleAcceptRes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
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
        const { totalPrice, startDate, endDate, hirerId, status, ownerId } = response.data[0];
        this.setState({ totalPrice, startDate, endDate, hirerId, status, ownerId });
        this.setState({ reservationId: this.props.match.params.id});
        console.log('RESERVATION RESPONSE', response);
        axios.get(`http://192.168.0.41:8080/api/users/${this.state.hirerId}`)
          .then((response) => {
            const hirerName = response.data.name;
            const hirerPic = response.data.pathPicture;
            this.setState({ hirerName, hirerPic });
            console.log('OWNER DATA>>>>>', response.data);
          });
          axios.get(`http://192.168.0.41:8080/api/users/${this.state.ownerId}`)
          .then((response) => {
            const ownerName = response.data.name;
            const ownerPic = response.data.pathPicture;
            this.setState({ ownerName, ownerPic });
            // console.log('OWNER DATA>>>>>', response.data);
            axios.get(`http://192.168.0.41:8080/api/messages/reservation/${this.state.reservationId}`)
              .then((response) => {
                console.log('OI');
                const messages = response.data;
                // console.log('MESSAGESSS', response.data);
                this.setState({ messages });
                console.log('state messages', this.state.messages);
              });
          });
      });
  }

  handleChange = e => {
    const {
      name,
      value
    } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    axios.post(`http://192.168.0.41:8080/api/messages/reservation/${this.state.reservationId}/users/${this.state.ownerId}/${this.state.hirerId}`, {
      text: this.state.text,
      sender: this.state.ownerId
    })
    .then((response) => {
      console.log(response);
    });
  }

  handleCancelRes() {
    console.log('reject');
    axios.patch(`http://192.168.0.41:8080/api/reservation/${this.props.match.params.id}`, { status: 'Recusado' })
      .then((response) => {
        const { status } = response.data;
        this.setState({ status: 'Recusado' });
        console.log('O pedido foi recusado!');
      })
      .catch(err => console.log(err));
  }

  handleAcceptRes() {
    console.log('accept');
    axios.patch(`http://192.168.0.41:8080/api/reservation/${this.props.match.params.id}`, { status: 'Alugando' })
      .then((response) => {
        const { status } = response.data;
        this.setState({ status: 'Alugando' });
        console.log('O pedido foi alugado');
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
    const { messages, hirerId, ownerId, ownerName } = this.state;
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


            {/* FORM DE MENSAGEM */}
            <Form onSubmit = { e => this.handleMessageSubmit(e) }>
          <Form.Group controlId = "exampleForm.ControlTextarea1" >
          <Form.Label > Envie uma mensagem ao proprietário </Form.Label> 
          <Form.Control as = "textarea"
          name = "text"
          value = {
            this.state.text
          }
          rows = "5"
          onChange = {  e => this.handleChange(e) }/> 
          </Form.Group> 
          <Button type = "submit" > Enviar </Button> 
          </Form>


          </Col>
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
                  <div className="">
                    <Card.Text>
                      <span style={{ 'font-size': '16px' }}> Status: </span>
                      {' '}
                      <strong>{this.state.status}</strong>
                      <hr />
                      <span style={{ 'font-size': '16px' }}> Início: </span>
                      {' '}
                      <strong>{this.state.startDate}</strong>
                      <br />
                      <span style={{ 'font-size': '16px' }}> Término: </span>
                      {' '}
                      <strong>{this.state.endDate}</strong>
                      <hr />
                      <span style={{ 'font-size': '16px' }}> Total: </span>
                      {' '}
                      <strong>R$ {this.state.totalPrice}</strong>
                      {' '}
                      <hr />

                      {(this.state.status === 'Em espera') ?
                        <div className="space-evenly">
                          <Button variant="success" onClick={this.handleAcceptRes}>aceitar</Button>
                          <Button variant="danger" onClick={this.handleCancelRes}>recusar</Button>
                        </div>
                        : false
                      }

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
<<<<<<< HEAD
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

            { (messages !== null) ?      
              (messages.reverse().map((item, index) => (
                <div key={index}>

                  <Card>
                    {(item.sender == this.state.hirerId) ? 
                    (<Card.Header><b>{this.state.hirerName}</b></Card.Header>) : (<Card.Header><b>{this.state.ownerName}</b></Card.Header>)}
                    <Card.Body>
                      <Card.Text>
                        {item.text}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              )))
              : false
            }



          </Col>
=======
              </Card>
            </Col>
>>>>>>> 29b745afc409fc83772c802df91a2ce75e4555f6

          </Row>
        </Container>
      </div >
    );
  }
}

export default SingleResOwner;
