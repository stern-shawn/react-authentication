import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import SignUpForm from '../components/SignUpForm.jsx';
import axios from 'axios';

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };
  }

  /**
   * Update user values based on field of the given event.
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
    // prevent default form submission event
    e.preventDefault();

    axios.post('/auth/signup', {
      name: this.state.user.name,
      email: this.state.user.email,
      password: this.state.user.password,
    }).then((res) => {
      this.setState({
        errors: {},
      });

      localStorage.setItem('successMessage', res.data.message);
      browserHistory.push('/login');
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
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default SignUpPage;
