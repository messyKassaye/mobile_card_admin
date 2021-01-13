import { Typography } from '@material-ui/core'
import React, { Component } from 'react'

 class AgentCardRequest extends Component {
    render() {
        const user = this.props.user
        return (
            <div>
                <Typography>
                    {this.props.user.first_name}
                </Typography>
            </div>
        )
    }
}


export default AgentCardRequest
