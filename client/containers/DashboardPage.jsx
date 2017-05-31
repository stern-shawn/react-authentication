import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import axios from 'axios';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      },
    };
    axios.get('/api/dashboard', config)
      .then((res) => {
        this.setState({
          secretData: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }
}

export default DashboardPage;
