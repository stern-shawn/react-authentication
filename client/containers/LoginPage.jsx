import React, { Component, PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };
  }

  /**
   * Change the user object.
   *
   * @param {object} e - the JavaScript event object
   */
  changeUser = (e) => {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }

  /**
   * Process the form.
   *
   * @param {object} e - the JavaScript event object
   */
  processForm = (e) => {
    e.preventDefault();

    axios.post('/auth/login', {
      email: this.state.user.email,
      password: this.state.user.password,
    }).then((res) => {
      // TODO
      console.log(res);
      this.setState({
        errors: {},
      });
    }).catch((err) => {
      // Grab the errors object from the response and map to state
      const errors = err.response.data.errors ? err.response.data.errors : {};
      errors.summary = err.message;
      this.setState({
        errors,
      });
    });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;
