import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends React.Component {
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

    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
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
