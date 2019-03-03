import React, { Component } from 'react';
// import axios from 'axios';



class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      location: '',
      email: '',
      password: ''
    };
    this.updateState = this.updateState.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  updateState(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    axios.post('API LINK', this.state)
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Name</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input className="input" onChange={e => this.updateState(e)} value={this.state.name} type="text" placeholder="Name" name="name" />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Região</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input className="input" onChange={e => this.updateState(e)} value={this.state.location} type="text" placeholder="Location" name="location" />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">E-mail</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input className="input" onChange={e => this.updateState(e)} value={this.state.description} type="text" placeholder="E-mail" name="email" />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Password</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input className="input" onChange={e => this.updateState(e)} value={this.state.password} type="text" placeholder="Password" name="password" />
              </p>
            </div>
          </div>
        </div>

        <input type="submit" value="submit" />
      </form>
    
    );
  }
}

export default Signup;
