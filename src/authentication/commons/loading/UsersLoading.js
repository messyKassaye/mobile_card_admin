import { Card, CardHeader, Grid } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
class UserLoading extends React.Component{

    render(){

        return <Grid container spacing={2}>
                <Grid item md={4} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                         title={<Skeleton variant={'rect'} width={'60%'} height={20} style={{backgroundColor:grey[500]}}/>}
                         avatar={<Skeleton variant={'circle'} width={40}height={40} style={{backgroundColor:grey[500]}}/>}
                         action={<Skeleton variant={'rect'} width={'40%'} height={20} style={{backgroundColor:grey[500]}}/>}
                          />
                    </Card>
                </Grid>

                <Grid item md={4} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                         title={<Skeleton variant={'rect'} width={'60%'} height={20} style={{backgroundColor:grey[500]}}/>}
                         avatar={<Skeleton variant={'circle'} width={40}height={40} style={{backgroundColor:grey[500]}}/>}
                         action={<Skeleton variant={'rect'} width={'40%'} height={20} style={{backgroundColor:grey[500]}}/>}
                          />
                    </Card>
                </Grid>

                <Grid item md={4} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                         title={<Skeleton variant={'rect'} width={'60%'} height={20} style={{backgroundColor:grey[500]}}/>}
                         avatar={<Skeleton variant={'circle'} width={40}height={40} style={{backgroundColor:grey[500]}}/>}
                         action={<Skeleton variant={'rect'} width={'40%'} height={20} style={{backgroundColor:grey[500]}}/>}
                          />
                    </Card>
                </Grid>

               
        </Grid>
    }
}

export default UserLoading