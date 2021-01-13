import { Notifications } from '@material-ui/icons';
import React from 'react'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import CardRequestCheckout from '../commons/CardRequestCheckout';
import Settings from '../commons/Settings';
import AgentAndRetailers from './component/AgentAndRetailers';
import AllNotifications from './component/AllNotifications';
import MyCardAndOrders from './component/MyCardsAndOrders';
import PartnersHome from './component/PartnersHome';
import Profile from './component/Profile';
import SellAndBuy from './component/SellAndBuy';
import Sellers from './component/Sellers';


class DistrictManagerNestedRoute extends React.Component{

    render(){
        return <Switch>
             <Route path='/auth' component={PartnersHome} exact/>
             <Route path='/auth/commons/card_request_checkout' component={CardRequestCheckout}/>
             <Route path={'/auth/partners/sellers'} component={Sellers}/>
             <Route path={'/auth/partners/my_cards'} component={MyCardAndOrders}/>
             <Route path={'/auth/partners/agent_retailer'} component={AgentAndRetailers}/>
             <Route path={'/auth/partners/profile/:id'} component={Profile}/>
             <Route path={'/auth/partners/sell_buy'} component={SellAndBuy}/>
             <Route path={'/auth/partners/notifications'} component={AllNotifications}/>
             <Route path = {'/auth/partners/settings'} component={Settings}/>
        </Switch>
    }
}

export default DistrictManagerNestedRoute