import React, { Component, PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

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

    console.log('name:', this.state.user.name);
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
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
