import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import './css/Product.css';
import Details from '../components/Product/Details';

const styles = theme => ({
  justifyContent: {
    justifyContent: 'center'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    paddingTop: '10%',
    margin: '0 20% 0 30%'
  },
  item: {
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    alignContent: 'space-between'
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  image: {
    maxWidth: '80%',
    padding: '10% 20%'
  },
  avatar: {
    heigth: '10px'
  }
});

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: '',
      ownerName: '',
      ownerPicture: '',
      title: '',
      description: '',
      pathPictures: '',
      category: '',
      pricePerDay: null,
      startDate: null,
      endDate: null,
      totalPrice: null
    };
  }

  componentDidMount() {
    axios.get(`http://192.168.0.41:8080/api/ads/${this.props.match.params.id}`, this.state)
      .then((response) => {
        const { ownerId, title, description, pathPictures, pricePerDay, category } = response.data;
        this.setState({ ownerId, title, description, pathPictures, pricePerDay, category });
        axios.get(`http://192.168.0.41:8080/api/users/${ownerId}`)
          .then((user) => {
            const ownerName = user.data.name;
            const ownerPicture = user.data.pathPicture;
            this.setState({ ownerName, ownerPicture });
          });
      })
      .catch(err => console.log(err));
  }


  render() {
    const { classes, theme } = this.props;
    return (
      <div className='app'>
        <Container>
          <Row className="justify-content">

            <Col xs={12} md={6}>
              <Card className='margin-bottom-5 align-item padding-5 border-shadow'>
                <Card.Img className="w-50" variant="top" src={this.state.pathPictures[0]} alt="product" />
              </Card>
              <Card>
                <Card.Header>Descrição</Card.Header>
                <Card.Body>
                  <Card.Text>
                    {this.state.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4} className="mt-2">
              <Card>
                <Card.Header><b>{this.state.title}</b></Card.Header>
                <Card.Body>
                  <div className="margin-bottom-5 padding-bottom-5 border-bottom">
                    <Card.Text>Diária R$ {this.state.pricePerDay}</Card.Text>
                  </div>
                  <Details priceperDay={this.state.pricePerDay} productID={this.props.match.params.id} />
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Product);
