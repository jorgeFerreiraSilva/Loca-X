/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
        const { totalPrice, startDate, endDate, hirerId } = response.data[0];
        this.setState({ totalPrice, startDate, endDate, hirerId });
        console.log('RESERVATION RESPONSE', response)
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
        console.log("Alugado");
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

  render () {
    return (
      <div>
        <Container>
          <Row>
            <Col>
            <h1>Infos do anuncio</h1>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.state.pathPictures[0]} />
                <Card.Body>
                  <Card.Title>{this.state.title}</Card.Title>
                  <Card.Text>
                  {this.state.description}
                  </Card.Text>
                  <Link to={{
                    pathname: `/product/${this.state.itemId}`
                  }}
                  >
                  <Button variant="primary">Ver página do produto</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                  <Card.Text>
                      De: {this.state.startDate}
                      Até: {this.state.endDate}<br></br>
                      Total: R${this.state.totalPrice}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SingleResOwner;
