import React from 'react';
// import Header from '../Header';
// import Footer from '../Footer';
import Main from '../Main';
import NavRouter from '../NavRouter';

const Layout = (props) => {
    return (
        <React.Fragment>
            <Main>
                <NavRouter />
            </Main>

        </React.Fragment>
    );
}

export default Layout;