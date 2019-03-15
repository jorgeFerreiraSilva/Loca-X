import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  withStyles
} from '@material-ui/core/styles';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const styles = theme => ({
  mycol: {
    width: '75%',
    margin: '0 auto'
  },

  profile: {
    width: '25%'
  },

  myrow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    border: '2px solid red',
    margin: '1% auto'
  },

  box: {
    marginBottom: '5%'
  }
});

class ReservationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      adId: null,
      hirerId: null,
      ownerId: null,
      pricePerDay: null,
      totalPrice: null,
      startDate: null,
      endDate: null,
      title: null,
      description: null,
      pathPictures: '',
      state: null,
      reservationId: null,
      sender: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  componentDidMount() {

    this.setState({
      adId: this.props.match.params.id
    });
    this.setState({
      hirerId: this.props.loggedInUser._id
    });
    console.log('LOGGED IN USER', this.props.loggedInUser._id);
    this.setState({
      sender: this.props.loggedInUser._id
    });
    console.log('SENDER', this.state.sender);
    const {
      startDate,
      endDate,
      totalPrice
    } = this.props.location.state;

    this.setState({
      startDate,
      endDate,
      totalPrice
    });
    axios.get(`http://192.168.0.41:8080/api/ads/${this.props.match.params.id}`)
      .then((response) => {
        const {
          ownerId,
          pricePerDay,
          title,
          description,
          pathPictures,
          state
        } = response.data;
        console.log(response.data);
        // console.log('aaaa', this.state.adId)
        this.setState({
          ownerId,
          pricePerDay,
          title,
          description,
          pathPictures,
          state
        });

      })
      .catch(err => console.log(err));
  }


  handleFormSubmit(event) {
    event.preventDefault();
    const {
      adId,
      ownerId,
      hirerId
    } = this.state;
    axios.post(`http://192.168.0.41:8080/api/reservation/ads/${adId}/users/${ownerId}/${hirerId}`, this.state)
      .then(response => {
        console.log('API REQUEST CRIAÇÃO NOVA RESERVA', response);
        const reservationId = response.data._id;
        this.setState({
          reservationId: response.data._id
        });
        // console.log('RES RESPONSE>>>>', response.data._id);
        axios.post(`http://192.168.0.41:8080/api/messages/reservation/${reservationId}/users/${this.state.ownerId}/${this.props.loggedInUser._id}`, {
            text: this.state.text,
            sender: this.state.sender
          })
          .then((response) => {
            console.log(response);
          });
      });
  }

  render() {
    const {
      pathPictures
    } = this.state;
    console.log(this.props.loggedInUser);
    const {
      classes
    } = this.props;
    if (pathPictures !== null) {
      console.log('aqui!');
      console.log('picture', pathPictures);
    }
    console.log(this.props.loggedInUser._id);
    console.log(this.state);


    return ( <div className = {
        classes.myrow
      } >

      <Container>
      <Row>
      <div className = {
        classes.profile
      }>
      <Col>
      <Card >
      <Card.Img variant = "top"
      src = {
        this.state.pathPictures[0]
      }/> <Card.Body >
      <Card.Title > {
        this.state.name
      } </Card.Title> <Card.Text > {
        this.state.description
      } </Card.Text> </Card.Body> </Card> </Col> </div> <div className = {
        classes.mycol
      } >
      <Col >
      <Card style = {
        {
          width: '20rem'
        }
      } >
      <Card.Body > {
        /* <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */
      } <Card.Text>
      De: {
        this.state.startDate
      } < br/>
      Até: {
        this.state.endDate
      } < br/>
      Total: R$ {
        this.state.totalPrice
      } </Card.Text> </Card.Body> </Card> 
      <Form onSubmit = {
        e => this.handleFormSubmit(e)
      } >
      <Form.Group controlId = "exampleForm.ControlTextarea1" >
      <Form.Label > Envie uma mensagem ao proprietário </Form.Label> 
      <Form.Control as = "textarea"
      name = "text"
      value = {
        this.state.text
      }
      rows = "5"
      onChange = {
        e => this.handleChange(e)
      }
      /> </Form.Group> 
      <Button type = "submit" > Enviar </Button> 
      </Form> </Col> </div> </Row> </Container>



      </div>

    );
  }
}

ReservationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReservationDetails);