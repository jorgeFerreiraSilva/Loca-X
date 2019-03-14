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

const styles = theme => ({
  right: {
    width: '55%',
    margin: '0 auto'
  },

  left: {
    width: '45%'
  },

  myrow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    border: '2px solid red',
    margin: '1% auto',
    fontFamily: "'Poppins', sans-serif"
  },

  box: {
    marginBottom: '5%'
  }
});

class SingleResHirer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      pathPictures: '',
      pricePerDay: '',
      totalPrice: '',
      startDate: '',
      endDate: '',
      hirerId: '',
      status: '',
      itemId: ''
    };
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
        console.log('RESERVATION RESPONSE', response);
      });
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
    const { classes } = this.props;
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
            <Card style={{ width: '20rem' }}>
              <Card.Body>
                {/* <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                <Card.Text>
                    De: {this.state.startDate}<br/>
                    Até: {this.state.endDate}<br/>
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

SingleResHirer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SingleResHirer);
