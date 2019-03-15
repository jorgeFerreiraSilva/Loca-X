/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import './css/Product.css';

const styles = theme => ({
  
  right: {
    width: '55%',
    margin: '0 auto'
  },

  left: {
    width: '45%'
  }
});

class SingleResHirer extends Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`http://192.168.0.41:8080/api/ads/${this.props.location.state.adId}`)
      .then((response) => {
        const { title, description, pathPictures, pricePerDay } = response.data;
        this.setState({ title, description, pathPictures, pricePerDay });
        const itemId = response.data._id;
        this.setState({ itemId });
      })
      .catch(err => console.log(err));
    axios.get(`http://192.168.0.41:8080/api/reservation/${this.props.match.params.id}`)
      .then((response) => {
        const { totalPrice, startDate, endDate, hirerId, ownerId, status } = response.data[0];
        this.setState({ totalPrice, startDate, endDate, hirerId, ownerId, status });
        this.setState({ reservationId: this.props.match.params.id});
        console.log('RESERVATION RESPONSE', response);
        axios.get(`http://192.168.0.41:8080/api/users/${this.state.hirerId}`)
          .then((response) => {
            const hirerName = response.data.name;
            this.setState({ hirerName });
          });
        axios.get(`http://192.168.0.41:8080/api/users/${this.state.ownerId}`)
          .then((response) => {
            const ownerName = response.data.name;
            const ownerPic = response.data.pathPicture;
            this.setState({ ownerName, ownerPic });
            axios.get(`http://192.168.0.41:8080/api/messages/reservation/${this.state.reservationId}`)
              .then((response) => {
                const messages = response.data;
                this.setState({ messages });
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
      sender: this.state.hirerId
    })
    .then((response) => {
      console.log(response);
      axios.get(`http://192.168.0.41:8080/api/messages/reservation/${this.state.reservationId}`)
      .then((response) => {
        const messages = response.data;
        this.setState({ messages });
        this.setState({ text: ''});
      });
    });
  }


  render() {
    
    const { classes } = this.props;
    const { messages, hirerId, ownerId, ownerName } = this.state;
    let reverseMsg = null;
    if (messages !== null) {
      reverseMsg = messages.slice().reverse();
    }
    return (
      <div className='app'>
      <Container>
        <Row className="justify-content">

          <Col xs={12} md={6} className="margin-bottom-5">
            <Card className='margin-bottom-5 align-item padding-5 border-shadow'>
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

          

          <Col xs={12} md={4}>
            <Card>
              <Card.Header><b>Informações da reserva</b></Card.Header>
              <Card.Body>
                <div className="margin-bottom-5 padding-bottom-5 border-bottom">
                  <Card.Text>
                  <span style={{ "font-size": '16px' }}> Status: </span> <strong>{this.state.status}</strong><hr/>
                    <span style={{ "font-size": '16px' }}> Início: </span> <strong>{this.state.startDate}</strong><br/>
                    <span style={{ "font-size": '16px' }}> Término: </span> <strong>{this.state.endDate}</strong><hr/>
                    <span style={{ "font-size": '16px' }}> Total: </span> <strong>R$ {this.state.totalPrice}</strong> </Card.Text>
                </div>
              </Card.Body>
            </Card>

            <Card className="text-center margin-top-bottom-5 padding-5" >
              <div> 
                <Link to={{
                  pathname: `/perfil/${this.state.ownerId}`
                }}>
                  <Image style={{ width: "130px" }} src={this.state.ownerPic} roundedCircle />
                </Link>
              </div>
              <div>
                <Card.Text>Anunciado por:
                {' '} {this.state.ownerName}
                </Card.Text>
              </div>
            </Card>

            { (reverseMsg !== null) ?      
              (reverseMsg.map((item, index) => (
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
        </Row>
      </Container>
    </div >
    );
  }
}

SingleResHirer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SingleResHirer);
