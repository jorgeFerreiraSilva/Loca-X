import React from 'react';
import service from '../api/service'
import NavLogged from '../../src/components/Navbars/Loggedin.js'
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';

const categories = [
  {
    label: 'Eletrônicos',
    value: 'Eletrônicos',
  },
  {
    value: 'Ferramentas',
    label: 'Ferramentas',
  },
  {
    value: 'Esportes e Aventura',
    label: 'Esportes e Aventura',
  },
  {
    value: 'Festa',
    label: 'Festa',
  },
  {
    value: 'Música',
    label: 'Música',
  },
  {
    value: 'Móveis',
    label: 'Móveis',
  },
  {
    value: 'Cozinha',
    label: 'Cozinha',
  },
  {
    value: 'Outros',
    label: 'Outros',
  }
];

const states = [
  {
    value: "AC",
    label: "AC"
  },
  {
    value: "AL",
    label: "AL"
  },
  {
    value: "AP",
    label: "AP"
  },
  {
    value: "AM",
    label: "AM"
  },
  {
    value: "BA",
    label: "BA"
  },
  {
    value: "CE",
    label: "CE"
  },
  {
    value: "DF",
    label: "DF"
  },
  {
    value: "ES",
    label: "ES"
  },
  {
    value: "GO",
    label: "GO"
  },
  {
    value: "MA",
    label: "MA"
  },
  {
    value: "MT",
    label: "MT"
  },
  {
    value: "MS",
    label: "MS"
  },
  {
    value: "MG",
    label: "MG"
  },
  {
    value: "PA",
    label: "PA"
  },
  {
    value: "PB",
    label: "PB"
  },
  {
    value: "PR",
    label: "PR"
  },
  {
    value: "PE",
    label: "PE"
  },
  {
    value: "PI",
    label: "PI"
  },
  {
    value: "RR",
    label: "RR"
  },
  {
    value: "RO",
    label: "RO"
  },
  {
    value: "RJ",
    label: "RJ"
  },
  {
    value: "RN",
    label: "RN"
  },
  {
    value: "RS",
    label: "RS"
  },
  {
    value: "SC",
    label: "SC"
  },
  {
    value: "SP",
    label: "SP"
  },
  {
    value: "SE",
    label: "SE"
  },
  {
    value: "TO",
    label: "TO"
  }
]


class AddProduct extends React.Component {

  constructor() {
    super();
    this.state = {
      title: '',
      pricePerDay: '',
      description: '',
      category: '',
      state: '',
      image1: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleFileUpload = e => {
    this.setState({ image1: e.target.files[0] });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { image1, title, description, pricePerDay, state, category } = this.state;
    const { _id: userId } = this.props.loggedInUser;

    const uploadData = new FormData();
    uploadData.append("image1", image1);
    uploadData.append('title', title)
    uploadData.append('description', description)
    uploadData.append('pricePerDay', pricePerDay)
    uploadData.append('state', state)
    uploadData.append('category', category)
    const redirect = null;
    service.saveNewThing(uploadData, userId)
      .then(res => {
        this.props.history.push('/')
      })
      .catch(err => {
        console.log("Error while adding the thing: ", err);
      });
  }

  render() {
    console.log(this.state);

    return (
      <div className="App">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card>

                <div className='w-75 mx-auto margin-top-bottom-20'>
                  <h5 className='text-center'>Dados do Anúncio</h5>
                  <form onSubmit={e => this.handleSubmit(e)} >
                    <div className="form-group">
                      <label for="">Título</label>
                      <input name="title"
                        value={this.state.title} onChange={e => this.handleChange(e)} type="text" placeholder="Bicicleta Xks Aro 29" />
                    </div>

                    <div className="form-group">
                      <label for="">Descrição</label>
                      <input
                        className="input"
                        name="description"
                        value={this.state.description}
                        onChange={e => this.handleChange(e)}
                        type="text"
                        placeholder="Freios à Disco"
                      />
                    </div>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Categoria</Form.Label>
                      <Form.Control as="select" value={this.state.category}
                        name="category"
                        onChange={e => this.handleChange(e)} >
                        {categories.map(option => (
                          <option>{option.value}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control as="select" value={this.state.state}
                        name="state"
                        onChange={e => this.handleChange(e)}>
                        {states.map(option => (
                          <option>{option.value}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <div className="form-group">
                      <label for="">Diária</label>
                      <input
                        className="input"
                        value={this.state.pricePerDay}
                        name="pricePerDay"
                        onChange={e => this.handleChange(e)}
                        type="number"
                        placeholder="R$"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        label="image1"
                        name="image1"
                        type="file"
                        onChange={(e) => this.handleFileUpload(e)} />
                    </div>

                    <div className='text-center'>
                      <Button type='submit'>Anunciar</Button>
                    </div>
                  </form>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}

export default AddProduct;