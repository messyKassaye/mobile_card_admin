import { Card, CardContent, CardHeader, Container, Grid } from '@material-ui/core'
import React from 'react'
import NewCardRequests from './widgets/NewCardRequests'
import OldestCardRequests from './widgets/OldestCardRequests'
import Pricings from './widgets/Pricings'

class CardRequestCheckout extends React.Component{

    render(){
        return <Container maxWidth={'lg'}>
            <Grid container spacing={2}>
                <Grid item md={8} xs={12} sm={12}>

                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12} sm={12}>
                            <NewCardRequests/>
                        </Grid>

                        <Grid item md={12} xs={12} sm={12}>
                            <OldestCardRequests/>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item md={4} xs={12} sm={12}>
                    <Pricings/>
                </Grid>

            </Grid>
        </Container>
    }
}


export default CardRequestCheckout