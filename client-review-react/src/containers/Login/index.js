import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class Login extends Component {

  state = {
    email: '',
    password: ''
  };

  onInputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = async (_e) => {
    const { email, password } = this.state;
    try {
      const signInResponse = await Auth.signIn({
        username: email,
        password
      });

      const { jwtToken } = signInResponse.signInUserSession.idToken;
      sessionStorage.clear(); // assuming that we only store the token in sessionStorage
      sessionStorage.setItem('token', jwtToken);
      this.props.history.push('/create');
    } catch (error) {
      console.log(error);
      // notify user 
    }
  }

  render() {
    return (
      <div className="center_div">
        <h1>Login</h1>
        <label>Username: </label>
        <input type="email" name="email" id="email" onChange={this.onInputChangeHandler} />
        <br />
        <label>Password: </label>
        <input type="password" name="password" id="password" onChange={this.onInputChangeHandler} />
        <br />
        <button onClick={this.onSubmitHandler}>Submit</button>
      </div>
    );
  };
};

export default Login;