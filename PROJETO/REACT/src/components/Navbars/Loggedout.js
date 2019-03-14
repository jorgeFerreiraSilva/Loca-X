import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../public/navStyle.css'


class NavLoggedOut extends React.Component {

  render() {
    return(  
      <Navbar className="navbar">
        <Navbar.Brand className="logo-menu" href="/">LocaX</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="item-menu">
            <Link to="/entrar">Entrar</Link>  
          </Navbar.Text>
          <Navbar.Text className="item-menu">
            <Link to="/cadastrar">Cadastrar</Link>  
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      );
    }

}

export default NavLoggedOut;
