import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'

class NewNotification extends React.Component{

    render() {
        return (
            <div style={{padding:20}}>
                {
                    this.props.notification.length>0
                    ?
                        (
                            <Grid container spacing={2}>
                                {
                                    this.props.notification.map(notification=>(
                                        <Grid key={notification.id} item md={6} xs={12} sm={12}>
                                            <Card>
                                                <CardHeader
                                                avatar={<Avatar>
                                                    {notification.user[0].first_name.charAt(0)}
                                                </Avatar>}
                                                title={notification.user[0].first_name}
                                                subheader={notification.entity.message}
                                                />
                                                <CardContent>
                                                    <Divider/>
                                                    <Typography>
                                                        {notification.message}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',padding:10}}>
                                                    <Button 
                                                    variant={'outlined'}
                                                    color={'secondary'}
                                                    style={{marginRight:15}}>
                                                        No
                                                    </Button>

                                                    <Button
                                                     variant={'contained'}
                                                     color={'primary'}>
                                                        Yes
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )
                    :
                        (
                            <Typography color={'secondary'}>
                                No new notification.
                            </Typography>
                        )
                }
            </div>
        )
    }
}

export default NewNotification