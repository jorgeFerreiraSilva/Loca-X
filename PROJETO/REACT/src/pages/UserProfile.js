import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';

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

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      description: '',
      pathPicture: '',
      state: '',
      ads: null
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    axios.get(`http://192.168.0.41:8080/api/users/${this.props.match.params.id}`)
      .then((response) => {
        const { _id, name, description, pathPicture, state } = response.data;
        this.setState({ _id, name, description, pathPicture, state });
      })
      .catch(err => console.log(err));
    axios.get(`http://192.168.0.41:8080/api/ads/users/${this.props.match.params.id}`)
      .then((response) => {
        const ads = response.data;
        console.log('-------------------');
        console.log('dados', response.data);
        console.log('-------------------');
        this.setState({ ads });
      });
  }


  render() {
    const { classes } = this.props;
    const { ads } = this.state;

    console.log('aqui', ads);
    // const { _id, name, description, pathPicture, state } = this.state;
    return (
    // eslint-disable-next-line react/jsx-filename-extension
      <div className={classes.myrow}>
        <Container>
          <Row>
            <div className={classes.profile}>
            <Col>
              <Card>
                <Card.Img variant="top" src={this.state.pathPicture} />
                <Card.Body>
                  <Card.Title>{this.state.name}</Card.Title>
                  <Card.Text>
                    {this.state.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            </div>
            <div className={classes.mycol}>
              <Col>
                <CardDeck>
                  { (ads !== null) ?      
                    (ads.map((item, index) => (
                      <div className={classes.box} key={index}>
                        <Card style={{ width: '15rem' }}>
                          <Card.Img variant="top" src={item.pathPictures} />
                          <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                              {item.description}<hr></hr>
                              Diária: <strong>R${item.pricePerDay}</strong>
                            </Card.Text>

                            <Link to={{
                              pathname: `/produto/${item._id}`,
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

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserProfile);
