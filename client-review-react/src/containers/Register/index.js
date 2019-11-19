import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class Register extends Component {

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
      const signUpResponse = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email: email
        }
      });

      console.log(signUpResponse);
      this.props.history.push('/login');

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <label>Email: </label>
        <input type="email" name="email" id="email" onChange={this.onInputChangeHandler} />
        <br/>
        <label>Password: </label>
        <input type="password" name="password" id="password" onChange={this.onInputChangeHandler} />
        <br/>
        <button onClick={this.onSubmitHandler}>Submit</button>
      </React.Fragment>
    );
  };
};

export default Register;