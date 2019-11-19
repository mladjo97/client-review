import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFound from '../NotFound';
import Login from '../../containers/Login';
import Register from '../../containers/Register';
import CreateReview from '../../containers/CreateReview';

const NavRouter = (_props) => {
    return (
        <Switch>
            <Route exact path="/" component={() => <Redirect to="/create" />} />
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/create" component={CreateReview} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default NavRouter;