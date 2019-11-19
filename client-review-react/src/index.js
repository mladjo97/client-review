import './index.css';
import App from './App';
import React from 'react';
import config from './config';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
