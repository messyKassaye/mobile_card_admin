import React from 'react'
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import HomePage from './HomePage';

class HomeRoutes extends React.Component{
    render(){

       return <Router>
            <Switch>
                <Route path='/' component={HomePage} exact/>
            </Switch>
        </Router>
    }
}

export default HomeRoutes