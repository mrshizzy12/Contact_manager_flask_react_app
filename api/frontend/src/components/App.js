import React, { Component, Fragment } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Contacts from './contacts/Contacts';
import Alerts from './layout/Alerts';
import Header from './layout/Header';
import About from './pages/About';
import AddContact from './contacts/AddContact';
import EditContact from './contacts/EditContact';
import NotFound from './pages/errors/NotFound';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { Provider } from 'react-redux';
import store from '../store';


// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center',
};


class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>   
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className='container'>
                                <Routes>
                                <Route exact path="/" element={<Contacts/>} />
                                <Route exact path="/about" element={<About/>} />
                                <Route exact path="/contact/add" element={<AddContact/>} />
                                <Route exact path="/contact/edit/:id" element={<EditContact/>} />
                                <Route path="*" element={<NotFound/>} />
                                </Routes>
                            </div>   
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    };
}





const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);