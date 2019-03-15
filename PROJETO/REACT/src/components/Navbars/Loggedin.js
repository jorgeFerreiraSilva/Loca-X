import React from 'react';
// import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../public/navStyle.css'
import axios from 'axios';
import { red } from '@material-ui/core/colors';
import AuthService from '../../auth/auth-service';
import '../../../public/navStyle.css';


class NavLogged extends React.Component {
  constructor(props) {
    super(props);

    this.service = new AuthService();
    this.userlogout = this.userlogout.bind(this);
  }

  userlogout() {
    this.service.logout()
      .then((response) => {
        this.props.updateUserLog(null)
      })
      .catch(err => console.log(err));
  }

  render() {

    return (
      <Navbar className="navbar">
        <Navbar.Brand className="logo-menu" href="/">LocaX</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="item-menu"  >
            <span>Olá</span> <Link to={`/user/${this.props.user._id}`} className="nav-item"> {this.props.user.name.toUpperCase()}</Link>
          </Navbar.Text>
          <Navbar.Text className="item-menu">
            <Link to="/reservas/inq" className="nav-item" >Minhas Reservas</Link>
          </Navbar.Text>
          <Navbar.Text className="item-menu">
            <Link to="/reservas/dono" className="nav-item">Meus Anuncios</Link>
          </Navbar.Text>
          <Navbar.Text className="item-menu">
            <Link onClick={this.userlogout} to="/" >Logout</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }


}

export default NavLogged;



