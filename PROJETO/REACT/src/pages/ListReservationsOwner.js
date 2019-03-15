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
import CardDeck from 'react-bootstrap/CardDeck';

const styles = theme => ({
  mycol: {
    width: '75%',
    margin: '0 auto'
  },
  box: {
    marginBottom: '5%'
  }
});


class ListReservationsOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userReservations: []
    };
  }

  componentDidMount() {
    this.setState({ userId: this.props.loggedInUser._id });

    axios.get(`http://192.168.0.41:8080/api/reservation/owner/${this.props.loggedInUser._id}`)
      .then((response) => {
        const userReservations = response.data;
        this.setState({ userReservations });
        console.log(userReservations);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 className='text-center fs-30'>Negociações</h1>
        <hr className="underTitulo" />
        <Container>
          <Row>
            <div className={classes.mycol}>
              <Col>
                <Link to="/adicionar">
                  <Button>Criar novo anúncio</Button>
                </Link>
                <CardDeck>
                  {(this.state.userReservations !== null) ?
                    (this.state.userReservations.map((item, index) => (
                      <div className={classes.box} key={index}>
                        <Card style={{ width: '15rem' }}>
                          <Card.Img variant="top" src={item.pathPictures} />
                          <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                              Datas: {item.startDate} => {item.endDate}<hr></hr>
                              Preço total: R${item.totalPrice}
                            </Card.Text>

                            <Link to={{
                              pathname: `/reservas/dono/${item._id}`,
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
                    )))
                    : false
                  }
                </CardDeck>
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

ListReservationsOwner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ListReservationsOwner);

