import React, {
  Component
} from 'react';
import { Redirect } from 'react-router-dom';
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
import './css/Details.css'

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
    margin: '1% auto'
  },

  box: {
    marginBottom: '5%'
  },
  textbutton: {
    textDecoration: 'none'
  }
});

class ReservationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
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
    axios.get(`http://locax.herokuapp.com/api/ads/${this.props.match.params.id}`)
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
    axios.post(`http://locax.herokuapp.com/api/reservation/ads/${adId}/users/${ownerId}/${hirerId}`, this.state)
      .then(response => {
        console.log('API REQUEST CRIAÇÃO NOVA RESERVA', response);
        const reservationId = response.data._id;
        this.setState({
          reservationId: response.data._id
        });
        // console.log('RES RESPONSE>>>>', response.data._id);
        axios.post(`http://locax.herokuapp.com/api/messages/reservation/${reservationId}/users/${this.state.ownerId}/${this.props.loggedInUser._id}`, {
          text: this.state.text,
          sender: this.state.sender
        })
          .then((response) => {
            console.log(response);
            this.setState({ redirect: <Redirect to="/" /> });
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
    const r = this.state.redirect !== null ? this.state.redirect : false;
    
    return (
      <div >
      {r}
        <Container>
          <Row className='mt-5'>
            <Col xs={12} md={6}>
              <Card className='margin-bottom-5 align-item padding-5 border-shadow'>
                <Card.Img className="w-50" variant="top" src={this.state.pathPictures[0]} />
                <Card.Body>
                  <Card.Title>{this.state.name}</Card.Title>
                  <Card.Text>{this.state.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card >
                <Card.Body > {}
                  <Card.Text>
                    <strong>{this.state.title}</strong>
                    <br />
                    <hr />
                    <div className='display'>
                      <span>Data de Retirada: </span>
                      <span>{this.state.startDate}</span>
                    </div>
                    <div className='display'>
                      <span>Data de Devolução: </span>
                      <span>{this.state.endDate}</span>
                    </div>
                    <hr />
                    <div className='display'>
                      <span><strong>Total: </strong></span>
                      <span><strong>R${this.state.totalPrice}</strong></span>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className='margin-top-5 border-none'>
                <Form onSubmit={e => this.handleFormSubmit(e)} >
                  <Form.Group controlId="exampleForm.ControlTextarea1" >
                    <Card.Header > Envie uma mensagem ao proprietário </Card.Header>
                    <Form.Control as="textarea"
                      name="text"
                      value={
                        this.state.text
                      }
                      rows="5"
                      onChange={
                        e => this.handleChange(e)
                      }
                    />
                  </Form.Group>
                  <Button type="submit" >Enviar</Button>
                </Form>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

ReservationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReservationDetails);
