import { Button, Card, CardContent, CardHeader, Divider } from '@material-ui/core'
import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
class NewAgentAndRetailers extends React.Component{

    render(){
        return <Card>
        <CardContent>
            <CardHeader
            title={'New agent & retailers'}
            avatar={<PersonIcon/>}
            action={
                <Button
                variant={'text'}
                color={'primary'}
                style={{textTransform:'none'}}
                size={'small'}>
                    See all
                </Button>
            }
            />
            <Divider/>

        </CardContent>
     </Card>
    }
}

export default NewAgentAndRetailers