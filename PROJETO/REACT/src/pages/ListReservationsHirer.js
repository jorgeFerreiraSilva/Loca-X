/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

class ListReservationsHirer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userReservations: []
    };
  }

  componentDidMount() {
    this.setState({ userId: this.props.loggedInUser._id});
    axios.get(`http://192.168.0.41:8080/api/reservation/hirer/${this.props.loggedInUser._id}`)
      .then((response) => {
        const userReservations = response.data;
        this.setState({ userReservations });
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <Container>
          <Row>
            <CardDeck>              
              { (this.state.userReservations !== null) ?      
                (this.state.userReservations.map((item, index) => (              
                  <Col>
                    <div key={index}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item.pathPictures} />
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text>
                          Datas: {item.startDate} => {item.endDate}<hr></hr>
                          Preço total: R${item.totalPrice}
                          </Card.Text>

                          <Link to={{
                            pathname: `/reservas/inq/${item._id}`,
                            state: {
                              adId: item.adId
                            }
                          }}
                          >
                            VER MAIS
                          </Link>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                )))
                : false
          }
            </CardDeck>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ListReservationsHirer;
