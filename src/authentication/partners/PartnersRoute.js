import React from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import PartnersDashboard from "./PartnersDashboard";
const DistrictManagerRoute = ()=>{
    return (
        <Router>
            <Switch>
                <Route path='/auth' component={PartnersDashboard}/>
            </Switch>
        </Router>
    )
}
export default DistrictManagerRoute