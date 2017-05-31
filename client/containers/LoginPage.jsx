import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../modules/Auth';
import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
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
      this.setState({
        errors: {},
      });

      Auth.authenticateUser(res.data.token);
      browserHistory.push('/');
    }).catch((err) => {
      // Grab the errors object from the response and map to state
      const errors = err.response.data.errors ? err.response.data.errors : {};
      errors.summary = err.response.data.message ? err.response.data.message : '';
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
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;
