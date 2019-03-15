import React from 'react';
import { Link } from 'react-router-dom';
import GifLoader from 'react-gif-loader';
import '../../public/confirmation.css';
import { Button } from 'react-bootstrap';



class Telaconfirmacao extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div><img className='confirm-img' src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif" />
      <button type="button" class="btn btn-success">Reservado com sucesso</button>
      </div>
  );
  }
}

export default Telaconfirmacao;