import { Card, CardContent, CardHeader } from '@material-ui/core'
import React from 'react'
import SendIcon from '@material-ui/icons/Send'
class OldestCardRequests extends React.Component{

    render(){
        return <Card elevation style={{backgroundColor:"transparent"}}>
            <CardHeader
             title={'Previous card requests'}
             avatar={<SendIcon/>}
            />
            <CardContent>

            </CardContent>
        </Card>
    }
}

export default OldestCardRequests