import { Card, CardContent, CardHeader, Grid } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

class CardLoading extends React.Component{

    render(){
        return <Grid container spacing={2}>
                <Grid item md={4}>
                    <Card>
                        <CardHeader
                         title={<Skeleton 
                            variant={'rect'} 
                            width={'70%'} height={15} 
                            style={{backgroundColor:grey[500]}}/>}
                         avatar={<Skeleton variant={'circle'} width={40} height={40} style={{backgroundColor:grey[500]}} />}
                        />
                        <CardContent>
                            <Skeleton
                             variant={'rect'}
                             width={'80%'}
                             height={30}
                             style={{backgroundColor:grey[500]}}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item md={4}>
                    <Card>
                        <CardHeader
                         title={<Skeleton 
                            variant={'rect'} 
                            width={'70%'} height={15} 
                            style={{backgroundColor:grey[500]}}/>}
                         avatar={<Skeleton variant={'circle'} width={40} height={40} style={{backgroundColor:grey[500]}} />}
                        />
                        <CardContent>
                            <Skeleton
                             variant={'rect'}
                             width={'80%'}
                             height={30}
                             style={{backgroundColor:grey[500]}}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item md={4}>
                    <Card>
                        <CardHeader
                         title={<Skeleton 
                            variant={'rect'} 
                            width={'70%'} height={15} 
                            style={{backgroundColor:grey[500]}}/>}
                         avatar={<Skeleton variant={'circle'} width={40} height={40} style={{backgroundColor:grey[500]}} />}
                        />
                        <CardContent>
                            <Skeleton
                             variant={'rect'}
                             width={'80%'}
                             height={30}
                             style={{backgroundColor:grey[500]}}
                            />
                        </CardContent>
                    </Card>
                </Grid>
        </Grid>
    }
}

export default CardLoading