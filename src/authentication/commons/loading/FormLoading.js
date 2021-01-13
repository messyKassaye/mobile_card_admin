import { Grid } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

class FormLoading extends React.Component{

    render(){
        return <Grid container spacing={2}>
        <Grid item md={12} xs={12} sm={12}>
            <Skeleton
             variant={'rect'}
             width={'100%'}
             height={50}
             style={{backgroundColor:grey[500]}}
            />
        </Grid>

        <Grid item md={12} xs={12} sm={12}>
            <Skeleton
             variant={'rect'}
             width={'100%'}
             height={50}
             style={{backgroundColor:grey[500]}}
            />
        </Grid>

        <Grid item md={12} xs={12} sm={12}>
            <Skeleton
             variant={'rect'}
             width={'100%'}
             height={50}
             style={{backgroundColor:grey[500]}}
            />
        </Grid>
    </Grid>
    }
}

export default FormLoading